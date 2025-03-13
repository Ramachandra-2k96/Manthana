"use client"

import React, { useEffect } from 'react';
import { Code2, Palette, Brain, Gamepad2 } from 'lucide-react';
import { EventCard } from './ui/EventCard';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function EventsSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [600, 900], [0, 1]);
  const scale = useTransform(scrollY, [600, 900], [0.8, 1]);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const events = [
    {
      title: 'Tech Events',
      description: 'Join exciting hackathons and coding challenges to showcase your technical prowess and build innovative solutions.',
      icon: Code2,
      delay: 100,
      slug: 'tech',
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: 'Cultural Events',
      description: 'Express yourself through dance, drama, and art in our vibrant cultural showcases that celebrate diversity.',
      icon: Palette,
      delay: 200,
      slug: 'cultural',
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: 'General Events',
      description: 'Engage in stimulating quizzes, debates, and public speaking competitions to sharpen your intellectual abilities.',
      icon: Brain,
      delay: 300,
      slug: 'general',
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: 'Gaming Events',
      description: 'Compete in thrilling e-sports tournaments and LAN gaming championships to prove your gaming mastery.',
      icon: Gamepad2,
      delay: 400,
      slug: 'gaming',
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%)] animate-pulse-slow" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.1),transparent_50%)] animate-pulse-slow delay-2000" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_30%)] animate-pulse-slow delay-4000" />
        
        {/* Enhanced floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 3 === 0 ? 'h-1 w-1 bg-white/60' : i % 3 === 1 ? 'h-2 w-2 bg-purple-400/40' : 'h-3 w-3 bg-blue-400/20'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -Math.random() * 30 - 20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [0, Math.random() * 0.5 + 0.5, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Competitions
            </motion.span>
          </h2>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover and participate in our diverse range of events designed to challenge,
            inspire, and bring out the best in you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.2 
                  } 
                }
              }}
              className="h-full"
            >
              <EventCard {...event} className="h-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </motion.section>
  );
}