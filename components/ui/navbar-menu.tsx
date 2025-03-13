"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface MenuItemProps {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  href?: string;
  direct?: boolean;
  children?: React.ReactNode;
  onNavigate?: (href: string) => void;
}

export const MenuItem = ({
  setActive,
  active,
  item,
  href, // Direct link
  direct = false, // For direct links with no dropdown
  children,
}: MenuItemProps) => {
  return (
    <div
      onMouseEnter={() => {
        if (!direct) {
          setActive(item); // Open dropdown if not a direct link
        } else {
          setActive(null); // Hide any open dropdowns if it's a direct link
        }
      }}
      className="relative"
    >
      {/* Direct link handling with full hover background */}
      {direct && href ? (
        <Link
          href={href}
          className="block p4 text-white text-xxl transition-all duration-300 
                     hover:text-purple-800 rounded-lg text-center font-semibold"
        >
          {item}
        </Link>
      ) : (
        <>
          <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:text-gray-300"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
      </>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/20 bg-black shadow-lg flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
  onNavigate: (href: string) => void;
}

export const ProductItem = ({
  title,
  description,
  href,
  src,
  onNavigate,
}: ProductItemProps) => {
  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      className="flex space-x-3 items-center p-2 transition-all duration-300 rounded-md hover:bg-white/10"
    >
      <div className="relative overflow-hidden rounded-md">
        <Image
          src={src}
          width={140}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="transition-all duration-300 group-hover:-translate-y-1">
        <h4 className="text-xl font-bold mb-1 text-white transition-colors duration-300 group-hover:text-yellow-400">
          {title}
        </h4>
        <p className="text-gray-400 text-sm max-w-[10rem] transition-colors duration-300 group-hover:text-gray-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link {...rest} className="text-gray-400 hover:text-white">
      {children}
    </Link>
  );
};
