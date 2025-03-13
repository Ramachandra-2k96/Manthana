"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type ProfileSectionProps = {
  userId: string;
  name: string;
  photoURL?: string;
  college?: string;
  totalPoints: number;
  rank?: number;
  totalParticipants?: number;
  eventCount: number;
};

export default function ProfileSection({
  userId,
  name,
  photoURL,
  college,
  totalPoints,
  rank,
  totalParticipants,
  eventCount,
}: ProfileSectionProps) {
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700/50">
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>
      
      <div className="px-6 pb-6 -mt-16">
        <div className="flex flex-col md:flex-row items-center md:items-end">
          <div className="relative w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-gray-700 shadow-xl">
            {photoURL ? (
              <Image
                src={photoURL}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
                {name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{name}</h1>
            {college && (
              <p className="text-gray-400 mt-1">{college}</p>
            )}
          </div>
          
          <div className="flex-1"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 md:mt-0 flex flex-col items-center bg-gray-800/60 rounded-xl p-4 border border-gray-700/50"
          >
            <p className="text-gray-400 text-sm">Total Points</p>
            <p className="text-3xl font-bold text-blue-400">{totalPoints}</p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-400 text-sm">Rank</p>
                <p className="text-xl font-bold text-white">
                  {rank ? `#${rank}` : 'N/A'}
                  {rank && totalParticipants && (
                    <span className="text-sm font-normal text-gray-400 ml-1">
                      of {totalParticipants}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-400 text-sm">Events</p>
                <p className="text-xl font-bold text-white">{eventCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-gray-400 text-sm">Avg. Points</p>
                <p className="text-xl font-bold text-white">
                  {eventCount > 0 ? Math.round(totalPoints / eventCount) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 