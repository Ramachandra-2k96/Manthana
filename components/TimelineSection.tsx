import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineSection() {
  const data = [
    {
      title: "March 20–21, 2025",
      content: (
        <div>
          <p className="text-neutral-100 text-xs md:text-sm font-normal mb-8">
            Kick off Varnothsava with a vibrant mix of techno-cultural events.
            Over these two days, enjoy coding challenges, art exhibitions, interactive workshops, and live performances that fuse technology with creativity.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/main/IMG_3927.webp"
              alt="Techno-Cultural Event 1"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/IMG_5098.webp"
              alt="Techno-Cultural Event 2"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/DSC01664.webp"
              alt="Techno-Cultural Event 3"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/DSC02622.webp"
              alt="Techno-Cultural Event 4"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "March 22, 2025",
      content: (
        <div>
          <p className="text-neutral-100 text-xs md:text-sm font-normal mb-8">
            Celebrate our Annual Day with grandeur and elegance. Enjoy inspiring keynote speeches, award ceremonies, and a showcase of achievements that highlight the spirit of our college community.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/main/DSC_0477.webp"
              alt="Annual Day Celebration 1"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/IMG_5422.webp"
              alt="Annual Day Celebration 2"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/IMG_4761.webp"
              alt="Annual Day Celebration 3"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/IMG_0399.webp"
              alt="Annual Day Celebration 4"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      ),
    },
    {
      title: "March 23, 2025",
      content: (
        <div>
          <p className="text-neutral-100 text-xs md:text-sm font-normal mb-8">
            The grand finale packs a punch! Start your day at the Autoexpo and Alumni Meet, showcasing innovative vehicles and reconnecting with old friends.
            Then, gear up for an electrifying evening as the renowned band “Thamaraseery churam” takes the stage for an unforgettable performance.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/main/DSC_0355.webp"
              alt="Autoexpo & Alumni Meet"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/DSC_0018.webp"
              alt="Autoexpo Display"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/main/IMG_7675.webp"
              alt="Evening Band Performance"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/images/mouse-trail/7.jpg"
              alt="Live Concert Vibes"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div id="timeline" className="w-full bg-black text-white p-8">
      <Timeline data={data} />
    </div>
  );
}
