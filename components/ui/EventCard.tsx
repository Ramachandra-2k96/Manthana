import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { cn } from '@/lib/utils';

interface EventCardProps {
  title: string;
  description: string;
  icon: any;
  delay: number;
  slug: string;
  gradient: string;
  className?: string;
}

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export function EventCard({ title, description, icon: Icon, delay, slug, gradient, className }: EventCardProps) {
  const handleClick = () => {
    window.location.href = `/events/#${slug}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.001 }}
      whileHover={{ scale: 1.02 }}
    >
      <Tilt options={defaultTiltOptions}>
        <div 
          onClick={handleClick}
          className={cn(
            "relative group cursor-pointer bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900",
            "rounded-xl p-8 overflow-hidden transition-all duration-500 ease-out",
            "hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]",
            className
          )}
        >
          {/* Animated background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Animated border */}
          <div className="absolute inset-0 border border-purple-500/20 rounded-xl group-hover:border-purple-500/40 
                       transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent 
                         group-hover:via-purple-500/40 transition-all duration-700 
                         animate-[shimmer_2s_infinite]" 
                 style={{ transform: 'translateX(-100%)' }} />
          </div>

          {/* Content wrapper with glass effect */}
          <div className="relative z-10 backdrop-blur-sm bg-black/5 rounded-lg p-6">
            {/* Icon container with floating animation */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 text-cyan-400 w-16 h-16 rounded-2xl bg-gray-800/50 
                       flex items-center justify-center group-hover:bg-gray-800/70 
                       transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <Icon size={32} className="group-hover:animate-pulse transition-transform duration-300 
                                    group-hover:scale-110" />
            </motion.div>

            {/* Text content with gradient effects */}
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-white 
                        bg-clip-text text-transparent transform transition-all duration-300 
                        group-hover:scale-105">{title}</h3>

            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 
                       leading-relaxed">{description}</p>

            {/* Interactive elements */}
            <div className="mt-6 flex items-center text-cyan-400 text-sm font-semibold opacity-0 
                         group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 
                         transition-all duration-300">
              Learn More
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-2"
              >→</motion.span>
            </div>
          </div>

          {/* Hover spotlight effect */}
          <div className="absolute -inset-full h-full w-full bg-gradient-to-r from-transparent 
                       via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] 
                       transform -translate-x-full" />
        </div>
      </Tilt>
    </motion.div>
  );
}