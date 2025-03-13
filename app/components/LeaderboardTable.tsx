"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type LeaderboardItem = {
  name: string;
  points: number;
  id?: string;
  photoURL?: string;
  subtitle?: string;
};

type LeaderboardTableProps = {
  items: LeaderboardItem[];
  currentUserId?: string | null;
  showAvatar?: boolean;
  showSubtitle?: boolean;
  startRank?: number;
  emptyMessage?: string;
  subtitle?: string;
};

export default function LeaderboardTable({
  items,
  currentUserId = null,
  showAvatar = true,
  showSubtitle = true,
  startRank = 1,
  emptyMessage = "No data available",
  subtitle: subtitleLabel = "College",
}: LeaderboardTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl overflow-hidden border border-purple-500/20 shadow-[0_0_15px_rgba(192,38,211,0.2)] backdrop-blur-md bg-black/30"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-purple-500/30 bg-black/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-fuchsia-400 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-fuchsia-400 uppercase tracking-wider">Name</th>
              {showSubtitle && (
                <th className="px-4 py-3 text-left text-xs font-medium text-fuchsia-400 uppercase tracking-wider hidden md:table-cell">
                  {subtitleLabel}
                </th>
              )}
              <th className="px-4 py-3 text-right text-xs font-medium text-fuchsia-400 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {items.length === 0 ? (
              <tr>
                <td colSpan={showSubtitle ? 4 : 3} className="px-4 py-8 text-center text-fuchsia-300">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const rank = startRank + index;
                const isCurrentUser = currentUserId && 'id' in item && item.id === currentUserId;
                
                return (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className={`
                      hover:bg-purple-900/20 transition-all
                      ${isCurrentUser ? 'bg-purple-900/30 border-l-4 border-fuchsia-500' : ''}
                    `}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`
                        inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium
                        ${rank === 1 ? 'bg-yellow-500/20 text-yellow-300' : 
                          rank === 2 ? 'bg-gray-400/20 text-gray-300' : 
                          rank === 3 ? 'bg-amber-600/20 text-amber-400' : 
                          'text-fuchsia-400'}
                      `}>
                        {rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {showAvatar && (
                          <div className="flex-shrink-0 h-8 w-8 mr-3">
                            {item.photoURL ? (
                              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-purple-500/30">
                                <Image
                                  src={item.photoURL}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white text-xs">
                                {item.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="text-sm font-medium text-white">
                          {item.name}
                        </div>
                      </div>
                    </td>
                    {showSubtitle && (
                      <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-300">
                          {item.subtitle || "-"}
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
                        {item.points}
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 