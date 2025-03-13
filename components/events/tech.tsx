"use client";

import Image from "next/image";
import { Tabs } from "../../components/ui/tabs";

export default function TabsDemo() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div className="relative w-full min-h-screen overflow-hidden text-xl md:text-4xl font-bold text-white">
          {/* Background Image */}
          <Image
            src="/images/mouse-trail/3.jpg"
            alt="dummy image"
            fill
            className="object-cover object-center"
          />
          {/* Foreground Content */}
          <div className="relative z-10 p-10">
            <p>Product Tab</p>
            <h1 className="text-5xl mt-4">DANDIYA 2K24</h1>
          </div>
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="relative w-full min-h-screen overflow-hidden text-xl md:text-4xl font-bold text-white">
          <Image
            src="/images/mouse-trail/3.jpg"
            alt="dummy image"
            fill
            className="object-cover object-center"
          />
          <div className="relative z-10 p-10">
            <p>Services Tab</p>
          </div>
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="relative w-full min-h-screen overflow-hidden text-xl md:text-4xl font-bold text-white">
          <Image
            src="/images/mouse-trail/3.jpg"
            alt="dummy image"
            fill
            className="object-cover object-center"
          />
          <div className="relative z-10 p-10">
            <p>Playground Tab</p>
          </div>
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className="relative w-full min-h-screen overflow-hidden text-xl md:text-4xl font-bold text-white">
          <Image
            src="/images/mouse-trail/3.jpg"
            alt="dummy image"
            fill
            className="object-cover object-center"
          />
          <div className="relative z-10 p-10">
            <p>Content Tab</p>
          </div>
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className="relative w-full min-h-screen overflow-hidden text-xl md:text-4xl font-bold text-white">
          <Image
            src="/images/mouse-trail/3.jpg"
            alt="dummy image"
            fill
            className="object-cover object-center"
          />
          <div className="relative z-10 p-10">
            <p>Random Tab</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <Tabs tabs={tabs} />
    </div>
  );
}
