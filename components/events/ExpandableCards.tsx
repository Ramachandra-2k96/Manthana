"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useQuery } from '@tanstack/react-query';

type Event = {
  _id: string;
  id: string;
  description: string;
  title: string;
  tag: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
};

type Tag = {
  id: string;
  name: string;
};

export default function EventCardDemo() {
  const [active, setActive] = useState<Event | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Fetch events with React Query for caching
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      
      // Add default values if missing
      return data.events.map((event: Event) => ({
        ...event,
        src: event.src || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
        ctaText: event.ctaText || "Know More",
        ctaLink: event.ctaLink || "#register",
        tag: event.tag || "technical"
      }));
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Filter events based on selected tag
  const filteredEvents = filter === "all" 
    ? events 
    : events.filter((event : Event) => event.tag === filter);

  // Pagination logic 
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

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

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-4 flex items-center justify-center">
        <div className="text-center bg-red-900/20 p-6 rounded-xl border border-red-700/40">
          <p>Error loading events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-emerald-400">Campus Events</h1>
      
      {/* Filter Navigation - Scrollable on mobile */}
      <div className="flex overflow-x-auto pb-2 justify-start md:justify-center gap-3 mb-6 no-scrollbar">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setFilter(tag.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              filter === tag.id
                ? "bg-emerald-500 text-gray-900"
                : "bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/70 border border-gray-800/30"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="flex absolute top-4 right-4 items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-full h-10 w-10 z-[110]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-[90vh] md:h-auto max-h-[90vh] flex flex-col bg-gray-900/70 backdrop-blur-md border border-gray-700/50 rounded-3xl overflow-hidden shadow-xl relative"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={400}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-48 md:h-60 lg:h-80 rounded-tr-3xl rounded-tl-3xl object-cover object-center"
                />
              </motion.div>

              <div className="flex flex-col overflow-hidden">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start p-4">
                  <div>
                    <motion.span
                      layoutId={`tag-${active.title}-${id}`}
                      className={`inline-block px-2 py-1 text-xs rounded-md ${
                        active.tag === "technical" 
                          ? "bg-blue-900/70 text-blue-200 backdrop-blur-sm" 
                          : active.tag === "cultural" 
                          ? "bg-purple-900/70 text-purple-200 backdrop-blur-sm"
                          : active.tag === "gaming"
                          ? "bg-red-900/70 text-red-200 backdrop-blur-sm"
                          : "bg-gray-800/70 text-gray-300 backdrop-blur-sm"
                      }`}
                    >
                      {active.tag.charAt(0).toUpperCase() + active.tag.slice(1)}
                    </motion.span>
                    <motion.h4
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-xl mt-2 text-white"
                    >
                      {active.title}
                    </motion.h4>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-gray-400 mb-4 md:mb-0"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-emerald-500 text-gray-900 hover:bg-emerald-400 transition-colors self-start md:self-end mt-2 md:mt-0"
                  >
                    Register
                  </motion.a>
                </div>
                
                <div className="px-4 pb-4 flex-grow overflow-auto">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-300 text-sm pb-6 prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: active.content }}
                  />
                </div>
                
                {/* Mobile-friendly back button at bottom */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActive(null)}
                  className="md:hidden sticky bottom-0 w-full py-3 bg-gray-800 text-white text-center font-medium"
                >
                  Back to Events
                </motion.button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <ul className="max-w-2xl mx-auto w-full gap-4 grid grid-cols-1">
        {currentEvents.map((event : Event) => (
          <motion.div
            layoutId={`card-${event.title}-${id}`}
            key={`card-${event.title}-${id}`}
            onClick={() => setActive(event)}
            className="p-4 flex flex-col justify-between bg-gray-900/40 hover:bg-gray-800/60 backdrop-blur-md border border-gray-800/30 rounded-xl cursor-pointer transition-colors shadow-lg"
          >
            <div className="flex items-center gap-3">
              <motion.div layoutId={`image-${event.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={event.src}
                  alt={event.title}
                  className="h-14 w-14 rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="flex-1">
                <motion.span
                  layoutId={`tag-${event.title}-${id}`}
                  className={`inline-block px-2 py-1 text-xs rounded-md mb-1 ${
                    event.tag === "technical" 
                      ? "bg-blue-900/70 text-blue-200 backdrop-blur-sm" 
                      : event.tag === "cultural" 
                      ? "bg-purple-900/70 text-purple-200 backdrop-blur-sm"
                      : event.tag === "gaming"
                      ? "bg-red-900/70 text-red-200 backdrop-blur-sm"
                      : "bg-gray-800/70 text-gray-300 backdrop-blur-sm"
                  }`}
                >
                  {event.tag.charAt(0).toUpperCase() + event.tag.slice(1)}
                </motion.span>
                <motion.h3
                  layoutId={`title-${event.title}-${id}`}
                  className="font-medium text-white"
                >
                  {event.title}
                </motion.h3>
              </div>
              <motion.button
                layoutId={`button-${event.title}-${id}`}
                className="px-3 py-2 text-xs rounded-full font-bold bg-gray-800/70 backdrop-blur-sm hover:bg-emerald-500 hover:text-gray-900 text-gray-300 transition-colors border border-gray-700/30 shrink-0"
              >
                Details
              </motion.button>
            </div>
            <motion.p
              layoutId={`description-${event.description}-${id}`}
              className="text-gray-400 mt-2"
            >
              {event.description}
            </motion.p>
          </motion.div>
        ))}
      </ul>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-800/30 text-gray-500 cursor-not-allowed"
                : "bg-gray-800/70 text-gray-300 hover:bg-gray-700"
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
                className={`w-8 h-8 rounded-full ${
                  currentPage === page
                    ? "bg-emerald-500 text-gray-900"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-800/30 text-gray-500 cursor-not-allowed"
                : "bg-gray-800/70 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* Optional: Add CSS for hiding scrollbar but allowing scrolling */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-gray-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// Navigation tags
const tags: Tag[] = [
  { id: "all", name: "All Events" },
  { id: "technical", name: "Technical" },
  { id: "cultural", name: "Cultural" },
  { id: "gaming", name: "Gaming" },
  { id: "workshop", name: "Workshops" }
];