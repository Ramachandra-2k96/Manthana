"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type PodiumCardProps = {
  position: 1 | 2 | 3;
  name: string;
  points: number;
  photoURL?: string;
  subtitle?: string;
  delay?: number;
};

export default function PodiumCard({
  position,
  name,
  points,
  photoURL,
  subtitle,
  delay = 0,
}: PodiumCardProps) {
  // Configuration based on position
  const config = {
    1: {
      zIndex: "z-20",
      avatarSize: "w-24 h-24 md:w-28 md:h-28",
      cardSize: "w-[120px] md:w-[140px] h-[150px] md:h-[180px]",
      bgColor: "from-yellow-300 to-yellow-500",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      cardBg: "from-yellow-900/40 to-black/80",
      cardBorder: "border-yellow-500",
      nameColor: "text-yellow-100",
      pointsColor: "text-yellow-300",
      subtitleColor: "text-yellow-200/70",
      glow: "shadow-[0_0_15px_rgba(234,179,8,0.5)]",
      star: true,
    },
    2: {
      zIndex: "z-10",
      avatarSize: "w-20 h-20 md:w-24 md:h-24",
      cardSize: "w-[100px] md:w-[120px] h-[120px] md:h-[150px]",
      bgColor: "from-gray-300 to-gray-400",
      borderColor: "border-gray-200",
      textColor: "text-gray-800",
      cardBg: "from-gray-800/80 to-black/80",
      cardBorder: "border-gray-400",
      nameColor: "text-gray-200",
      pointsColor: "text-gray-300",
      subtitleColor: "text-gray-400",
      glow: "shadow-[0_0_10px_rgba(156,163,175,0.4)]",
      star: false,
    },
    3: {
      zIndex: "z-10",
      avatarSize: "w-20 h-20 md:w-24 md:h-24",
      cardSize: "w-[100px] md:w-[120px] h-[100px] md:h-[130px]",
      bgColor: "from-amber-600 to-amber-800",
      borderColor: "border-amber-500",
      textColor: "text-amber-100",
      cardBg: "from-amber-900/40 to-black/80",
      cardBorder: "border-amber-700",
      nameColor: "text-gray-200",
      pointsColor: "text-amber-500",
      subtitleColor: "text-gray-400",
      glow: "shadow-[0_0_10px_rgba(217,119,6,0.4)]",
      star: false,
    },
  }[position];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay, type: "spring" }}
      className={`${config.zIndex}`}
    >
      <div className="flex flex-col items-center">
        {config.star && (
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="w-8 h-8 mb-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" className="drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
            </svg>
          </motion.div>
        )}
        
        <div
          className={`relative ${config.avatarSize} rounded-full bg-gradient-to-br ${config.bgColor} flex items-center justify-center mb-2 border-4 ${config.borderColor} ${config.glow} overflow-hidden`}
        >
          {photoURL ? (
            <Image
              src={photoURL}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <span className={`${position === 1 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-bold ${config.textColor}`}>
              {position}
            </span>
          )}
        </div>
        
        <div
          className={`${config.cardSize} bg-gradient-to-b ${config.cardBg} backdrop-blur-md rounded-xl flex flex-col items-center justify-center p-2 border-t-4 ${config.cardBorder} ${config.glow}`}
        >
          <p className={`font-bold text-sm md:text-base text-center ${config.nameColor} line-clamp-2`}>
            {name}
          </p>
          
          {subtitle && (
            <p className={`text-xs ${config.subtitleColor} mb-2 line-clamp-1`}>
              {subtitle}
            </p>
          )}
          
          <p className={`${position === 1 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold ${config.pointsColor} mt-2`}>
            {points}
          </p>
          
          <p className={`text-xs ${config.subtitleColor}`}>points</p>
        </div>
      </div>
    </motion.div>
  );
}