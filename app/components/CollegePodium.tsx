"use client";

import { motion } from "framer-motion";

type CollegeItem = {
  name: string;
  institution?: string;
  points: number;
  rank: number;
};

type PremiumLeaderboardProps = {
  items: CollegeItem[];
  onVisible?: () => void;
};

export default function PremiumLeaderboard({
  items,
  onVisible
}: PremiumLeaderboardProps) {
  // Sort items by points in descending order
  const sortedItems = [...items]
    .sort((a, b) => b.points - a.points)
    .slice(0, 2);
  
  // Add rank property if not provided
  sortedItems.forEach((item, index) => {
    item.rank = item.rank || index + 1;
  });

  // If we don't have enough items, fill with placeholders
  while (sortedItems.length < 2) {
    sortedItems.push({
      name: "No Entry",
      institution: "",
      points: 0,
      rank: sortedItems.length + 1
    });
  }

  // Function to get rank badge styles
  const getRankStyles = (rank: number) => {
    if (rank === 1) {
      return {
        bg: "bg-yellow-500",
        border: "border-yellow-400",
        text: "text-yellow-900",
        shadow: "shadow-[0_0_15px_rgba(234,179,8,0.5)]"
      };
    } else {
      return {
        bg: "bg-gray-300",
        border: "border-gray-200",
        text: "text-gray-800",
        shadow: "shadow-[0_0_10px_rgba(156,163,175,0.4)]"
      };
    }
  };

  // Function to get card styles
  const getCardStyles = (rank: number) => {
    if (rank === 1) {
      return {
        border: "border-yellow-600/50",
        shadow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]",
        gradientFrom: "from-yellow-950/90",
        gradientTo: "to-yellow-900/80",
        pointsColor: "text-yellow-500"
      };
    } else {
      return {
        border: "border-gray-700/50",
        shadow: "shadow-[0_0_15px_rgba(75,85,99,0.3)]",
        gradientFrom: "from-gray-950/90",
        gradientTo: "to-gray-900/80",
        pointsColor: "text-gray-300"
      };
    }
  };

  return (
    <div className="w-full">
      {/* Background glow */}
      <div className="absolute inset-0 bg-purple-900/20 blur-3xl -z-10 rounded-full mx-auto my-auto w-2/3 h-1/2 opacity-60"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative">
        {/* Star for first place */}
        {sortedItems[0].rank === 1 && (
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              delay: 0.5,
              type: "spring",
              stiffness: 200
            }}
            className="absolute left-1/2 -translate-x-1/2 -top-10 z-10 md:left-1/4"
          >
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]">
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
            </motion.div>
          </motion.div>
        )}
        
        <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-8 md:gap-16 py-16">
          {sortedItems.map((item, index) => {
            const rankStyles = getRankStyles(item.rank);
            const cardStyles = getCardStyles(item.rank);
            
            // Determine if this is first or second place
            const isFirst = item.rank === 1;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: isFirst ? 0.2 : 0.4,
                  duration: 0.7,
                  type: "spring" 
                }}
                className={`relative ${isFirst ? "md:order-1 z-10" : "md:order-2"}`}
              >
                {/* Rank circle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-16 h-16 rounded-full ${rankStyles.bg} ${rankStyles.border} border-2 flex items-center justify-center ${rankStyles.shadow}`}
                  >
                    <span className={`text-2xl font-bold ${rankStyles.text}`}>
                      {item.rank}
                    </span>
                  </motion.div>
                </div>
                
                {/* Card Container */}
                <motion.div
                  whileHover={{ 
                    y: -5, 
                    boxShadow: isFirst 
                      ? "0 10px 25px rgba(234,179,8,0.4)" 
                      : "0 10px 20px rgba(174, 180, 191, 0.87)"
                  }}
                  className={`w-64 ${isFirst ? "md:w-72" : "md:w-64"} overflow-hidden rounded-2xl border ${cardStyles.border} ${cardStyles.shadow} flex flex-col`}
                >
                  {/* Main Info */}
                  <div className={`bg-gradient-to-b ${cardStyles.gradientFrom} ${cardStyles.gradientTo} p-6 pt-12 flex flex-col items-center`}>
                    <h3 className="text-xl font-bold text-white mb-1 text-center line-clamp-2">
                      {item.name}
                    </h3>
                    
                    {item.institution && (
                      <p className="text-sm text-purple-300 opacity-80 mb-4 text-center">
                        {item.institution}
                      </p>
                    )}
                    
                    <div className="mt-2 mb-2">
                      <span className={`text-4xl font-bold ${cardStyles.pointsColor}`}>
                        {item.points}
                      </span>
                      <span className="text-purple-300 opacity-70 ml-2 text-sm">points</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full mt-4">
                      <div className="h-1.5 w-full bg-purple-900/30 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${isFirst 
                            ? "bg-gradient-to-r from-yellow-600 to-yellow-400" 
                            : "bg-gradient-to-r from-gray-500 to-gray-400"}`}
                          initial={{ width: 0 }}
                          animate={{ width: isFirst ? "100%" : `${(item.points / (sortedItems[0].points || 1)) * 100}%` }}
                          transition={{ delay: isFirst ? 0.6 : 0.8, duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge/Stats section */}
                  <div className="bg-black/50 backdrop-blur-sm p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1.5">
                        {[...Array(3)].map((_, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: i < (item.points > 50 ? 3 : item.points > 20 ? 2 : 1) ? 1 : 0.3 }}
                            transition={{ delay: 1 + (i * 0.2) }}
                            className={`w-2 h-2 rounded-full ${
                              isFirst ? "bg-yellow-500" : "bg-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full animate-pulse mr-1.5 ${
                          isFirst ? "bg-yellow-500" : "bg-gray-400"
                        }`}></div>
                        <span className="text-xs text-purple-200 opacity-80">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Reflection/shadow effect */}
                <div className="mt-3 h-6 bg-gradient-to-b from-purple-900/20 to-transparent rounded-full mx-auto w-3/4 blur-sm"></div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="w-full flex justify-center mt-4"
        >
          <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </motion.div>
      </div>
    </div>
  );
}