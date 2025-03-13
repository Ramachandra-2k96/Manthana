import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid } from "./ui/bento-grid";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-12 bg-black text-neutral-200">
      {/* Section Heading */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Gallery</h2>
        <p className="mt-2 text-lg text-neutral-400">
          A few shots about previous Varnothsava
        </p>
      </div>
      {/* Grid of Images */}
      <BentoGrid className="max-w-6xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "relative group rounded-xl overflow-hidden bg-neutral-800",
              (i === 3 || i === 6) && "md:col-span-2"
            )}
          >
            {/* The Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            {/* Overlay with Text (hidden until hover) */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 group-hover:bg-opacity-60 transition-all duration-300">
              <h3 className="text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition duration-300">
                {item.title}
              </h3>
              <p className="text-neutral-300 text-sm opacity-0 group-hover:opacity-100 transition duration-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </BentoGrid>
    </section>
  );
}

const items = [
  {
    title: "Food Fest",
    description: "Indulge in a variety of delicious cuisines from across regions.",
    image: "/images/main/DSC02622.webp",
  },
  {
    title: "Tech & Cultural Events",
    description: "Exciting competitions, workshops, and mesmerizing performances.",
    image: "/images/main/DSC_0345.webp",
  },
  {
    title: "Dance & Drama",
    description: "Experience breathtaking dance performances and theatrical acts.",
    image: "/images/main/DSC_0477.webp",
  },
  {
    title: "Music & Arts Showcase",
    description: "A perfect blend of artistic creativity and musical talent.",
    image: "/images/main/IMG_7708.webp",
  },
  {
    title: "Auto Expo",
    description: "A thrilling display of vintage and modern automobiles.",
    image: "/images/main/IMG_4761.webp",
  },
  {
    title: "College Band",
    description: "Our very own band setting the stage on fire with live music.",
    image: "/images/main/DSC_0513.webp",
  },
  {
    title: "Night Lights",
    description: "The campus illuminated beautifully, setting a magical vibe.",
    image: "/images/mouse-trail/1.jpg",
  },
  {
    title: "Band",
    description: "Electrifying concert by the famous band!",
    image: "/images/mouse-trail/7.jpg",
  },
  {
    title: "Yakshagana",
    description: "Experience breathtaking dance performances and theatrical acts.",
    image: "/images/main/DSC_0027.webp",
  },
  {
    title: "Decoration",
    description: "Nice decoration.",
    image: "/images/main/IMG_0367.webp",
  },
];

