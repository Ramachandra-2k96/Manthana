"use client";
import { useAnimate } from "framer-motion";
import React, { useRef, ReactNode, MouseEvent } from "react";

interface MouseImageTrailProps {
  children: ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}

const MouseImageTrail: React.FC<MouseImageTrailProps> = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current = { x: clientX, y: clientY };
      renderNextImage();
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) return;

    // Add an offset so images don't overlap the mouse cursor exactly.
    const offset = 20; // Adjust this value for more or less spacing.
    const offsetX = imageIndex % 2 === 0 ? -offset : offset;
    const offsetY = imageIndex % 2 === 0 ? -offset : offset;
    el.style.top = `${lastRenderPosition.current.y + offsetY}px`;
    el.style.left = `${lastRenderPosition.current.x + offsetX}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;
    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) rotate(${imageIndex % 2 ? rotation : -rotation}deg)`,
          `translate(-50%, -50%) scale(1) rotate(${imageIndex % 2 ? -rotation : rotation}deg)`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    // Updated fade-out to occur after 1.5 seconds.
    animate(
      selector,
      { opacity: [1, 0] },
      { ease: "linear", duration: 0.5, delay: 0.7 }
    );

    imageRenderCount.current++;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}
      {images.map((img, index) => (
        <img
          key={index}
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default MouseImageTrail;
