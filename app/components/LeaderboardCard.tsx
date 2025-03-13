"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type LeaderboardCardProps = {
  rank: number;
  name: string;
  points: number;
  photoURL?: string;
  subtitle?: string;
  isCurrentUser?: boolean;
  delay?: number;
};

export default function LeaderboardCard({
  rank,
  name,
  points,
  photoURL,
  subtitle,
  isCurrentUser = false,
  delay = 0,
}: LeaderboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      className={`flex items-center p-4 border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors ${
        isCurrentUser ? "bg-blue-900/30 hover:bg-blue-900/40" : ""
      }`}
    >
      <div className="w-16 text-center">
        <span className={`${isCurrentUser ? "text-blue-300" : "text-gray-400"}`}>
          {rank}
        </span>
      </div>
      
      {photoURL !== undefined && (
        <div className="w-12">
          {photoURL ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image src={photoURL} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div
              className={`w-8 h-8 rounded-full ${
                isCurrentUser ? "bg-blue-500/50" : "bg-gray-700/50"
              } flex items-center justify-center text-blue-200`}
            >
              {name.charAt(0)}
            </div>
          )}
        </div>
      )}
      
      <div className={`flex-1 font-medium truncate ${isCurrentUser ? "text-blue-300" : ""}`}>
        {name}
        {isCurrentUser && (
          <span className="ml-2 text-xs bg-blue-500/30 px-2 py-0.5 rounded-full">
            You
          </span>
        )}
      </div>
      
      {subtitle && (
        <div className="w-1/3 hidden md:block text-gray-400 truncate">
          {subtitle}
        </div>
      )}
      
      <div
        className={`w-24 text-center font-bold ${
          isCurrentUser ? "text-blue-300" : "text-blue-400"
        }`}
      >
        {points}
      </div>
    </motion.div>
  );
} 