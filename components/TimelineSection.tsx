import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineSection() {
  const data = [
    {
      title: "March 17, 2025",
      content: (
        <div>
          <p className="text-neutral-100 text-xs md:text-sm font-normal mb-8">
            Day 1 of Manthana-25 kicks off with a vibrant mix of cultural competitions. 
            Enjoy solo singing (Raaga Ninada), group singing (Swaranjali), creative arts like Mehandi (Hasthakala) and Hairstyling (Swarnashringara), 
            and an exciting Ethnic Fashion Walk (Roopasanchara) that showcases our rich cultural heritage.
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
      title: "March 18, 2025",
      content: (
        <div>
          <p className="text-neutral-100 text-xs md:text-sm font-normal mb-8">
            Day 2 of Manthana-25 brings even more excitement with creative challenges and performances. 
            Explore outdoor concept models (Aakarsha), test your skills in Memento Design (Akriti), 
            embark on a thrilling Treasure Hunt (Dhanveshan), and experience the energy of traditional Tiger Dance (Pili tha Pajje).
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
  ];
  return (
    <div id="timeline" className="w-full bg-black text-white p-8">
      <Timeline data={data} />
    </div>
  );
}