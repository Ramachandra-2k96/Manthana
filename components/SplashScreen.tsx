"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useAnimation, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export default function WebsiteReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Framer Motion animations
  const controls = useAnimation()
  const isInView = useInView(featuresRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 1])
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.6], [60, 0, -60])

  // GSAP animations
  useEffect(() => {
    if (!isLoaded) return

    // Heading animation with SplitText
    if (headingRef.current) {
      const splitText = new SplitText(headingRef.current, { type: "chars, words" })

      gsap.from(splitText.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(1.7)",
      })
    }

    // Marquee animation
    if (marqueeRef.current) {
      const marqueeItems = marqueeRef.current.querySelectorAll(".marquee-item")

      gsap.to(marqueeItems, {
        xPercent: -100,
        ease: "none",
        duration: 20,
        repeat: -1,
        repeatDelay: 0,
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      })
    }

    // Image reveal animation
    if (imageRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(imageRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
      })
    }
  }, [isLoaded])

  // Trigger Framer Motion animations when features section is in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Feature items with staggered animation
  const featureItems = [
    "Responsive Design",
    "Modern Animations",
    "Performance Optimized",
    "Dark Theme",
    "Interactive Elements",
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <div ref={containerRef} className="bg-gray-900 text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 z-10"
        />

        <motion.div style={{ y: textY }} className="container mx-auto px-6 z-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-purple-400 font-mono mb-4"
          >
            Discover the future of web animations
          </motion.p>

          <h1 ref={headingRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stunning Website Reveal Animations
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg mb-8"
          >
            Create immersive user experiences with advanced animation techniques using Framer Motion and GSAP
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Explore Now
            </button>
          </motion.div>
        </motion.div>

        <motion.div style={{ scale: imageScale, opacity: imageOpacity }} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
          <div className="w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-gray-800 overflow-hidden">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Cutting-Edge Animation Technologies
          </motion.h2>
        </div>

        <div ref={marqueeRef} className="relative flex overflow-hidden py-10">
          <div className="flex space-x-8 marquee-item whitespace-nowrap">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex space-x-8">
                  <span className="text-4xl font-bold text-purple-500">GSAP</span>
                  <span className="text-4xl font-bold text-blue-500">Framer Motion</span>
                  <span className="text-4xl font-bold text-green-500">ScrollTrigger</span>
                  <span className="text-4xl font-bold text-yellow-500">Animation</span>
                  <span className="text-4xl font-bold text-red-500">Transitions</span>
                  <span className="text-4xl font-bold text-indigo-500">Effects</span>
                </div>
              ))}
          </div>

          <div className="flex space-x-8 marquee-item whitespace-nowrap">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex space-x-8">
                  <span className="text-4xl font-bold text-purple-500">GSAP</span>
                  <span className="text-4xl font-bold text-blue-500">Framer Motion</span>
                  <span className="text-4xl font-bold text-green-500">ScrollTrigger</span>
                  <span className="text-4xl font-bold text-yellow-500">Animation</span>
                  <span className="text-4xl font-bold text-red-500">Transitions</span>
                  <span className="text-4xl font-bold text-indigo-500">Effects</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Immersive Visual Experiences</h2>
              <p className="text-gray-300">
                Our advanced animation techniques create stunning visual narratives that captivate your audience and
                elevate your brand presence online.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                  <span>Parallax scrolling effects</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                  <span>Smooth page transitions</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                  <span>Interactive hover states</span>
                </li>
              </ul>
            </motion.div>

            <div ref={imageRef} className="rounded-lg overflow-hidden shadow-2xl">
              <img src="/placeholder.svg?height=600&width=800" alt="Animation showcase" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Key Features
          </motion.h2>

          <motion.div
            ref={featuresRef}
            variants={container}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featureItems.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature}</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Website?</h2>
            <p className="text-xl text-gray-200 mb-8">
              Implement these advanced animations and take your user experience to the next level.
            </p>
            <button className="bg-white text-purple-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

