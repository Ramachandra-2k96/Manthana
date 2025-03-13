"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PodiumCard from "./PodiumCard";

type PodiumItem = {
  name: string;
  points: number;
  photoURL?: string;
  subtitle?: string;
};

type PodiumProps = {
  items: PodiumItem[];
  showSubtitle?: boolean;
  onVisible?: () => void;
};

export default function Podium({
  items,
  showSubtitle = true,
  onVisible,
}: PodiumProps) {
  const podiumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (podiumRef.current && onVisible) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onVisible();
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(podiumRef.current);
      return () => observer.disconnect();
    }
  }, [onVisible]);

  if (items.length < 3) {
    return null;
  }

  return (
    <motion.div
      ref={podiumRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 0.3 }}
      className="relative h-[400px] md:h-[450px] w-full mb-12"
    >
      {/* Podium Base with cyberpunk glow - but no line on top */}
      <div className="absolute bottom-0 w-full h-4 bg-purple-800/50 rounded-full blur-md shadow-[0_0_20px_rgba(192,38,211,0.4)]"></div>
      
      {/* Podium Container */}
      <div className="absolute bottom-0 w-full flex justify-center items-end">
        <div className="flex items-end space-x-4 md:space-x-8">
          {/* Second Place */}
          <div className="mb-10 md:mb-16">
            <PodiumCard
              position={2}
              name={items[1].name}
              points={items[1].points}
              photoURL={items[1].photoURL}
              subtitle={showSubtitle ? items[1].subtitle : undefined}
              delay={0.5}
            />
          </div>
          
          {/* First Place */}
          <div className="mb-0 md:mb-0">
            <PodiumCard
              position={1}
              name={items[0].name}
              points={items[0].points}
              photoURL={items[0].photoURL}
              subtitle={showSubtitle ? items[0].subtitle : undefined}
              delay={0.3}
            />
          </div>
          
          {/* Third Place */}
          <div className="mb-20 md:mb-24">
            <PodiumCard
              position={3}
              name={items[2].name}
              points={items[2].points}
              photoURL={items[2].photoURL}
              subtitle={showSubtitle ? items[2].subtitle : undefined}
              delay={0.7}
            />
          </div>
        </div>
      </div>
      
      {/* Removed the decorative lines that were appearing on top of player cards */}
    </motion.div>
  );
} 