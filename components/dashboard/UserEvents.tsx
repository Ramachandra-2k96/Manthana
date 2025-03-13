"use client";

import { useState, useEffect } from 'react';
import { Trophy, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventPoints {
  participationPoint: boolean;
  firstPlace?: boolean;
  secondPlace?: boolean;
  thirdPlace?: boolean;
  fourthPlace?: boolean;
  completedInTime?: boolean;
}

interface Event {
  _id: {
    $oid: string;
  } | string;
  userId: string;
  eventId: string;
  eventName?: string;
  eventPoints: EventPoints;
  registeredAt: {
    $date: {
      $numberLong: string;
    }
  } | string;
}

export default function UserEvents({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserEvents() {
      try {
        console.log("Fetching events for user:", userId);
        
        // Use the new event-registrations API endpoint
        const response = await fetch(`/api/event-registrations?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error(`API returned status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API response:", data);
        
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching user events:', error);
        setError(`Failed to load events: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchUserEvents();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="py-4">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-300 border-l-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-center mt-2 text-gray-300">Loading your events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-200">
        <p className="font-bold mb-2">Error: {error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-300 mb-2">You haven't participated in any events yet.</p>
        <p className="text-gray-400 text-sm">Join an event to see it here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Your Events ({events.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event, index) => (
          <EventCard
            key={typeof event._id === 'string' ? event._id : event._id.$oid || `event-${index}`}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventDetails, setEventDetails] = useState<any>(null);
  // Default image from Unsplash as fallback
  const defaultImageUrl = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        console.log("Fetching event details for ID:", event.eventId);
        
        const response = await fetch(`/api/events/${event.eventId}`);
        
        console.log("Event details API response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Event details data:", data);
          
          // Extract the event data from the nested structure
          if (data.success && data.event) {
            setEventDetails(data.event);
          } else {
            console.error("Event data not found in response:", data);
          }
        } else {
          console.error("Failed to fetch event details:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    }
    
    if (event.eventId) {
      fetchEventDetails();
    } else {
      console.error("No eventId available for fetching details");
    }
  }, [event.eventId]);

  // Format the registration date
  const getFormattedDate = () => {
    try {
      if (typeof event.registeredAt === 'string') {
        return new Date(event.registeredAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      } else if (event.registeredAt && typeof event.registeredAt === 'object' && event.registeredAt.$date) {
        const timestamp = parseInt(event.registeredAt.$date.$numberLong);
        return new Date(timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      return 'Unknown date';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  // Determine user's achievement in this event
  const getUserAchievement = () => {
    if (!event.eventPoints) return { text: 'Registered', color: 'bg-blue-600' };
    
    if (event.eventPoints.firstPlace) return { text: '1st Place', color: 'bg-yellow-500' };
    if (event.eventPoints.secondPlace) return { text: '2nd Place', color: 'bg-gray-300' };
    if (event.eventPoints.thirdPlace) return { text: '3rd Place', color: 'bg-amber-700' };
    if (event.eventPoints.fourthPlace) return { text: '4th Place', color: 'bg-indigo-600' };
    if (event.eventPoints.participationPoint) return { text: 'Participated', color: 'bg-green-600' };
    return { text: 'Registered', color: 'bg-blue-600' };
  };

  const achievement = getUserAchievement();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-4 border border-gray-800"
    >
      <div className="relative h-32 w-full">
        {/* Add image background with fallback */}
        <div className="absolute inset-0 bg-black">
          {/* Use next/image for optimized image loading */}
          <img 
            src={eventDetails?.src || defaultImageUrl} 
            alt={eventDetails?.title || 'Event'} 
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              // If image fails to load, use default image
              (e.target as HTMLImageElement).src = defaultImageUrl;
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-xl font-bold text-white">{eventDetails?.title || 'Event'}</h3>
          <p className="text-gray-300 text-sm">{getFormattedDate()}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-2" size={20} />
            <span className="text-white font-bold">
              {achievement.text}
            </span>
          </div>
          
          <div className={`${achievement.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            <Trophy size={14} className="inline mr-1" />
            {achievement.text}
          </div>
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between py-2 px-3 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <span className="font-medium">Event Details</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-2 overflow-hidden"
            >
              {eventDetails && (
                <>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Event Name:</p>
                    <p className="text-gray-200">{eventDetails.title}</p>
                  </div>
                  {eventDetails.description && (
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Description:</p>
                      <p className="text-gray-200 text-sm">{eventDetails.description}</p>
                    </div>
                  )}
                </>
              )}
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Registered On:</p>
                <p className="text-gray-200">{getFormattedDate()}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 