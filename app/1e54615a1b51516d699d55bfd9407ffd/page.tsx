"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import * as XLSX from 'xlsx';

interface Event {
  _id: string;
  id: string;
  title: string;
  description: string;
  tag: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
  password: string;
}

type Tag = {
  id: string;
  name: string;
};

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Event card state
  const [active, setActive] = useState<Event | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const ref = useRef<HTMLDivElement>(null);

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPassword, setExportPassword] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  
  const ADMIN_EXPORT_PASSWORD = "varnotsava2023"; // Replace with your desired password

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();

        if (data.success) {
          // Add default src if missing
          const eventsWithDefaults = data.events.map((event: Event) => ({
            ...event,
            src: event.src || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
            ctaText: event.ctaText || "Know More",
            ctaLink: event.ctaLink || "#register",
            tag: event.tag || "technical"
          }));
          setEvents(eventsWithDefaults);
        } else {
          setError(data.message || 'Failed to fetch events');
        }
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (!selectedEvent) return;
      
      // Get the event to check password
      const response = await fetch(`/api/events/${selectedEvent}`);
      
      // Log response status for debugging
      console.log('API Response Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch event: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Log the response data structure (without sensitive info)
      console.log('API Response Structure:', {
        success: data.success,
        hasEvent: !!data.event,
        passwordProvided: !!password
      });
      
      if (data.success && data.event) {
        if (data.event.password === password) {
          // Success case
          toast.success('Authentication successful!');
          // Store auth in session and redirect
          sessionStorage.setItem(`event_auth_${selectedEvent}`, 'true');
          router.push(`/1e54615a1b51516d699d55bfd9407ffd/events/${selectedEvent}/admin`);
        } else {
          // Wrong password case
          console.log('Password mismatch');
          toast.error('Incorrect password');
        }
      } else {
        // No success or no event in response
        console.error('Invalid API response format:', data);
        toast.error(data.error || 'Failed to verify event details');
      }
    } catch (error) {
      // Log the actual error
      console.error('Authentication error:', error);
      toast.error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  // Filter events based on selected tag
  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.tag === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Get tag color class
  const getTagColorClass = (tag: string) => {
    switch (tag) {
      case "technical":
        return "bg-blue-900/40 text-blue-300 border border-blue-700/30";
      case "cultural":
        return "bg-purple-900/40 text-purple-300 border border-purple-700/30";
      case "business":
        return "bg-amber-900/40 text-amber-300 border border-amber-700/30";
      default:
        return "bg-gray-800/40 text-gray-300 border border-gray-700/30";
    }
  };

  // Animation variants for consistent animations
  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: pageTransition },
    exit: { opacity: 0, y: 20, transition: pageTransition }
  };

  const handleExportWinners = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      // Verify password
      if (exportPassword !== ADMIN_EXPORT_PASSWORD) {
        toast.error('Incorrect admin password');
        return;
      }
      
      // Fetch winners data from all events
      const response = await fetch('/api/events/winners');
      
      if (!response.ok) {
        throw new Error('Failed to fetch winners');
      }
      
      const data = await response.json();
      
      if (!data.success || !data.winners) {
        throw new Error(data.error || 'Failed to get winners data');
      }
      
      // Format data for Excel
      const excelData = data.winners.map((winner: any) => ({
        'Event Name': winner.eventName,
        'Position': winner.position,
        'Student Name': winner.studentName,
        'USN': winner.usn,
        'College': winner.college,
        'Points': winner.points
      }));
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Winners');
      
      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Varnotsava_Winners.xlsx';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close modal and show success
      setShowExportModal(false);
      setExportPassword("");
      toast.success('Winners data exported successfully!');
      
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export winners: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-4 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white flex flex-col items-center"
        >
          <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="mt-4 text-lg font-medium">Loading events...</span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-4 flex items-center justify-center">
        <div className="text-white bg-red-900/20 backdrop-blur-sm p-6 rounded-xl border border-red-700/40 max-w-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            maxWidth: '500px',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#333',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#333',
            },
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500"
          >
            Event Management
          </motion.h1>
          
          {/* Filter Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {tags.map((tag, index) => (
              <motion.button
                key={tag.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 + (index * 0.1) }
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ y: 0 }}
                onClick={() => setFilter(tag.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === tag.id
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/20"
                    : "bg-gray-900/80 backdrop-blur-sm text-gray-300 hover:bg-gray-800 border border-gray-800/50 hover:border-teal-500/30 shadow-md shadow-black/20"
                }`}
              >
                {tag.name}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm h-full w-full z-10"
              />
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            {active ? (
              <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                <motion.button
                  key={`button-${active.title}`}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.3 },
                  }}
                  className="flex absolute top-4 right-4 items-center justify-center bg-gray-900/80 backdrop-blur-md rounded-full h-12 w-12 z-[110] border border-gray-700/40 hover:border-red-500/50 shadow-lg transition-all hover:bg-red-900/20"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                
                <motion.div
                  layoutId={`card-${active.title}`}
                  ref={ref}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ 
                    scale: 0.95, 
                    opacity: 0, 
                    transition: { duration: 0.3 } 
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-[600px] h-[85vh] md:h-auto md:max-h-[85vh] flex flex-col bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl relative"
                  style={{
                    boxShadow: "0 0 40px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  <motion.div layoutId={`image-${active.title}`}>
                    <div className="relative w-full h-48 lg:h-72">
                      <Image
                        priority
                        fill
                        src={active.src}
                        alt={active.title}
                        className="rounded-tr-3xl rounded-tl-3xl object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                      <motion.span
                        layoutId={`tag-${active.title}`}
                        className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-md ${getTagColorClass(active.tag)}`}
                      >
                        {active.tag.charAt(0).toUpperCase() + active.tag.slice(1)}
                      </motion.span>
                    </div>
                  </motion.div>

                  <div className="flex flex-col overflow-hidden flex-grow">
                    <div className="flex justify-between items-start p-4 md:p-6">
                      <div className="flex-1 pr-2">
                        <motion.h3
                          layoutId={`title-${active.title}`}
                          className="font-bold text-xl md:text-2xl mb-2 text-white"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${active.description}`}
                          className="text-gray-400 text-sm md:text-base"
                        >
                          {active.description}
                        </motion.p>
                      </div>

                      <motion.button
                        layoutId={`button-${active.title}`}
                        onClick={() => {
                          setActive(null);
                          handleEventClick(active._id);
                        }}
                        className="px-4 py-2 md:px-6 md:py-3 text-sm rounded-full font-bold whitespace-nowrap bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-400 hover:to-blue-400 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-1"
                      >
                        Manage Event
                      </motion.button>
                    </div>
                    
                    {/* Improved mobile scrolling area - increased height and better padding */}
                    <div className="px-4 md:px-6 flex-grow overflow-auto custom-scrollbar" 
                         style={{ 
                           height: "calc(85vh - 48px - 120px - 48px)",
                           maxHeight: "100%", 
                           WebkitOverflowScrolling: "touch" 
                         }}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-300 text-sm md:text-base pb-6 md:pb-8 prose prose-invert prose-sm md:prose-base max-w-none"
                        dangerouslySetInnerHTML={{ __html: active.content }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
          
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto w-full gap-4 grid grid-cols-1"
          >
            {currentEvents.map((event, index) => (
              <motion.div
                layoutId={`card-${event.title}`}
                key={`card-${event.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4 + (index * 0.1) }
                }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                onClick={() => setActive(event)}
                className="p-4 flex flex-col md:flex-row justify-between items-center bg-gray-900/40 hover:bg-gray-800/60 backdrop-blur-md border border-gray-800/40 hover:border-teal-500/30 rounded-xl cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="flex gap-3 md:gap-5 flex-col md:flex-row w-full md:w-auto">
                  <motion.div layoutId={`image-${event.title}`} className="relative mx-auto md:mx-0">
                    <div className="h-32 w-32 md:h-16 md:w-16 rounded-lg relative overflow-hidden">
                      <Image
                        fill
                        src={event.src}
                        alt={event.title}
                        className="object-cover object-center transition-transform group-hover:scale-110"
                      />
                    </div>
                  </motion.div>
                  <div className="text-center md:text-left flex-1">
                    <motion.span
                      layoutId={`tag-${event.title}`}
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 shadow-md ${getTagColorClass(event.tag)}`}
                    >
                      {event.tag.charAt(0).toUpperCase() + event.tag.slice(1)}
                    </motion.span>
                    <motion.h3
                      layoutId={`title-${event.title}`}
                      className="font-medium text-white text-lg mb-1"
                    >
                      {event.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${event.description}`}
                      className="text-gray-400 text-sm line-clamp-3 mx-auto md:mx-0 max-w-full"
                    >
                      {event.description}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${event.title}`}
                  className="shrink-0 px-5 py-2 text-sm rounded-full font-bold bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-500 text-gray-300 hover:text-white mt-4 md:mt-0 transition-all border border-gray-700/30 hover:border-transparent shadow-md hover:shadow-lg shadow-black/10 hover:shadow-teal-500/20"
                >
                  Manage
                </motion.button>
              </motion.div>
            ))}
          </motion.ul>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center items-center gap-2 mt-10"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-900/30 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800/70 text-gray-300 hover:bg-gray-700 border border-gray-800/50 hover:border-teal-500/30 transition-all"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-full transition-all ${
                      currentPage === page
                        ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/20"
                        : "bg-gray-900/50 text-gray-300 hover:bg-gray-800 border border-gray-800/50 hover:border-teal-500/30"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-900/30 text-gray-600 cursor-not-allowed"
                    : "bg-gray-800/70 text-gray-300 hover:bg-gray-700 border border-gray-800/50 hover:border-teal-500/30 transition-all"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {showPasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-[200]">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 max-w-md w-full border border-gray-800/50 shadow-2xl"
                style={{
                  boxShadow: "0 0 40px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 0, 0, 0.3)"
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Enter Event Password</h3>
                <form onSubmit={handlePasswordSubmit}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 focus:border-teal-500/50 text-white rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-transparent shadow-inner placeholder-gray-500"
                    placeholder="Enter password"
                    autoFocus
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordModal(false);
                        setPassword('');
                        setSelectedEvent(null);
                      }}
                      className="px-5 py-3 border border-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-800 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-400 hover:to-blue-400 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 disabled:from-gray-700 disabled:to-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Custom scrollbar styles - improved for touch devices */}
        <style jsx global>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(59, 130, 246, 0.5) rgba(31, 41, 55, 0.2);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.5);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.7);
          }
          
          /* Improved mobile text rendering */
          @media (max-width: 768px) {
            .prose {
              font-size: 16px !important;
              line-height: 1.6 !important;
            }
            .prose p {
              margin-bottom: 1em !important;
            }
            .prose h1, .prose h2, .prose h3, .prose h4 {
              margin-top: 1.5em !important;
              margin-bottom: 0.75em !important;
            }
          }
        `}</style>

        {/* Add Export Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
          >
            Export Winners
          </button>
        </div>
        
        {/* Export Password Modal */}
        <AnimatePresence>
          {showExportModal && (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-[200]">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 max-w-md w-full border border-gray-800/50 shadow-2xl"
                style={{
                  boxShadow: "0 0 40px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 0, 0, 0.3)"
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Enter Admin Password</h3>
                <form onSubmit={handleExportWinners}>
                  <input
                    type="password"
                    value={exportPassword}
                    onChange={(e) => setExportPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/50 focus:border-purple-500/50 text-white rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-transparent shadow-inner placeholder-gray-500"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowExportModal(false);
                        setExportPassword('');
                      }}
                      className="px-5 py-3 border border-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-800 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isExporting}
                      className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 disabled:from-gray-700 disabled:to-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {isExporting ? 'Exporting...' : 'Export Winners'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      whileHover={{ rotate: 90 }}
      transition={{ duration: 0.2 }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-gray-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// Navigation tags - updated to only include technical, cultural, business
const tags: Tag[] = [
  { id: "all", name: "All Events" },
  { id: "technical", name: "Technical" },
  { id: "cultural", name: "Cultural" },
  { id: "business", name: "Business" }
];