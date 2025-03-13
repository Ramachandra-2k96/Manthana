"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type PodiumItem = {
  name: string;
  points: number;
  photoURL?: string;
  subtitle?: string;
};

type MobilePodiumProps = {
  items: PodiumItem[];
  showSubtitle?: boolean;
};

export default function MobilePodium({
  items,
  showSubtitle = true,
}: MobilePodiumProps) {
  if (items.length < 3) {
    return null;
  }

  // Define the top 3 positions
  const positions = [
    { rank: 1, item: items[0], delay: 0.3 },
    { rank: 2, item: items[1], delay: 0.5 },
    { rank: 3, item: items[2], delay: 0.7 },
  ];

  return (
    <div className="sm:hidden mb-8">
      <h3 className="text-center text-lg font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Top 3</h3>
      <div className="space-y-3">
        {positions.map(({ rank, item, delay }) => (
          <motion.div
            key={rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className={`
              flex items-center p-3 rounded-xl backdrop-blur-md border
              ${rank === 1 
                ? 'bg-gradient-to-r from-yellow-900/20 to-black/40 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                : rank === 2 
                ? 'bg-gradient-to-r from-gray-800/30 to-black/40 border-gray-500/30 shadow-[0_0_10px_rgba(156,163,175,0.2)]' 
                : 'bg-gradient-to-r from-amber-900/20 to-black/40 border-amber-600/30 shadow-[0_0_10px_rgba(217,119,6,0.2)]'}
            `}
          >
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-3
              ${rank === 1 
                ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 border-2 border-yellow-200' 
                : rank === 2 
                ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800 border-2 border-gray-200' 
                : 'bg-gradient-to-br from-amber-500 to-amber-700 text-amber-100 border-2 border-amber-400'}
            `}>
              {rank}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{item.name}</p>
              {showSubtitle && item.subtitle && (
                <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
              )}
            </div>
            
            <div className={`
              flex-shrink-0 font-bold text-lg
              ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-amber-500'}
            `}>
              {item.points}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 