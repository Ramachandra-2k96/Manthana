"use client";
import { useMotionValueEvent, useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 10%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <div className="w-full bg-black font-sans md:px-10" ref={containerRef}>
    <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
      <h2 className="text-lg md:text-4xl mb-4 text-white">
        Timeline of Varnothsava 2025
      </h2>
      <p className="text-gray-400 text-sm md:text-base max-w-sm">
        Embark on an unforgettable journey at Varnothsava 2025! From March 20th to 23rd, join us for a dynamic blend of events
      </p>
    </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs md:w-full">
              <div className="h-10 absolute left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-gray-600 border border-gray-500 p-2" />
              </div>
              <h3 className="hidden md:block text-5xl font-bold text-gray-400 md:pl-20">{item.title}</h3>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-400">{item.title}</h3>
              <div className="bg-black p-4 rounded-lg">{item.content}</div>
            </div>
          </div>
        ))}
        <div style={{ height: height + "px" }} className="absolute left-8 top-0 w-[2px] bg-gray-700">
          <motion.div style={{ height: heightTransform }} className="absolute inset-x-0 top-0 w-[2px] bg-purple-500" />
        </div>
      </div>
    </div>
  );
};