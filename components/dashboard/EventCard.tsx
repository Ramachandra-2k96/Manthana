"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Trophy, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopPerformer {
  id: string;
  name: string;
  points: number;
  position: number;
}

interface EventCardProps {
  eventId: string;
  eventName: string;
  userPoints: number;
  posterUrl?: string;
  isUserTopPerformer: boolean;
  userPosition?: number;
  topPerformers: TopPerformer[];
}

export default function EventCard({
  eventId,
  eventName,
  userPoints,
  posterUrl = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  isUserTopPerformer,
  userPosition,
  topPerformers
}: EventCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-4 border border-gray-800"
    >
      <div className="relative h-32 w-full">
        <Image 
          src={posterUrl} 
          alt={eventName}
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-xl font-bold text-white">{eventName}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-2" size={20} />
            <span className="text-white font-bold">Your Points: {userPoints}</span>
          </div>
          
          {isUserTopPerformer && (
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Trophy size={14} className="mr-1" />
              {userPosition === 1 ? '1st Place' : userPosition === 2 ? '2nd Place' : '3rd Place'}
            </div>
          )}
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2 px-3 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <span className="font-medium">Top Performers</span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-2 overflow-hidden"
            >
              {topPerformers.map((performer, index) => (
                <div 
                  key={performer.id}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    performer.id === 'current-user' ? 'bg-indigo-900/50 border border-indigo-700' : 'bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-300' : 
                      index === 2 ? 'bg-amber-700' : 'bg-gray-700'
                    }`}>
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-200">{performer.name}</span>
                  </div>
                  <span className="text-gray-300 font-medium">{performer.points} pts</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 