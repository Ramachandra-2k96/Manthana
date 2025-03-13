"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative">
      {cards.map((card) => (
        <div key={card.id} className={cn(card.className)}>
          <motion.div
            className="relative overflow-hidden rounded-xl h-64"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={card.thumbnail}
                alt="thumbnail"
                fill
                className="object-cover transition duration-200"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-end bg-black bg-opacity-50 p-4"
            >
              <div className="text-white">{card.content}</div>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
