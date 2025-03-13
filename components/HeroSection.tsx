"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import MouseImageTrail from "./ui/MouseImageTrail";

export default function HeroSection() {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "/images/mouse-trail/1.jpg",
        "/images/mouse-trail/3.jpg",
        "/images/mouse-trail/4.jpg",
        "/images/mouse-trail/5.jpg",
        "/images/mouse-trail/6.jpg",
        "/images/mouse-trail/7.jpg",
      ]}
    >
      <HeroParallax products={products} />
    </MouseImageTrail>
  );
}

export const products = [
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC01664.webp",
      key: "1",
  },
  {
    title: "Moto mania",
    thumbnail:
      "/images/main/DSC_0018.webp",
      key: "2",
  },
  {
    title: "Moto mania",
    thumbnail:
      "/images/main/DSC_0355.webp",
      key: "3",
  },
 
  {
    title: "College band",
    thumbnail:
      "/images/main/DSC_0513.webp",
      key: "4",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_0421.webp",
      key: "5",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC02460.webp",
      key: "6",
  },
 
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0041.webp",
      key: "7",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_0497.webp",
      key: "8",
  },
  {
    title: "Algoritham",
    thumbnail:
      "/images/main/IMG_7708.webp",
      key: "9",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_3927.webp",
      key: "10",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0027.webp",
      key: "11",
  },
 
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/IMG_0399.webp",
      key: "12",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0014.webp",
      key: "13",
  },
  {
    title: "Varnothsava",
    thumbnail:
      "/images/main/DSC_0293.webp",
      key: "14",
  },
  {
    title: "Tech-event Varnothsava",
    thumbnail:
      "/images/main/IMG_3858.webp",
      key: "15",
  },
];
