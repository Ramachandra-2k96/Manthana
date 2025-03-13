"use client";

import { motion } from "framer-motion";

export default function ProfileSectionSkeleton() {
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700/50">
      <div className="relative h-32 bg-gradient-to-r from-blue-600/30 to-purple-600/30 animate-pulse">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>
      
      <div className="px-6 pb-6 -mt-16">
        <div className="flex flex-col md:flex-row items-center md:items-end">
          <div className="relative w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-gray-700/70 animate-pulse"></div>
          
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <div className="h-8 w-48 bg-gray-700/70 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-gray-700/70 rounded animate-pulse"></div>
          </div>
          
          <div className="flex-1"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 md:mt-0 flex flex-col items-center bg-gray-800/60 rounded-xl p-4 border border-gray-700/50"
          >
            <div className="h-4 w-20 bg-gray-700/70 rounded animate-pulse mb-2"></div>
            <div className="h-8 w-16 bg-gray-700/70 rounded animate-pulse"></div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700/50 animate-pulse"></div>
                <div className="ml-3">
                  <div className="h-4 w-16 bg-gray-700/70 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-24 bg-gray-700/70 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 