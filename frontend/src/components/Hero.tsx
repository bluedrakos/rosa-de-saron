"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroProps {
  data: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: {
      url: string;
      alternativeText: string;
    } | null;
  } | null;
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const imageUrl = data?.heroImage ? getStrapiMedia(data.heroImage.url) : null;
  
  // Hardcoded defaults to match the requested design exactly
  const titlePart1 = "UN LUGAR";
  const titlePart2 = "DE ESPERANZA"; // In spanish: LA IGLESIA
  const dateText = "01 DE ABRIL, 1989";
  const smallText = "Somos Rosa de Sarón, una iglesia que busca llevar la luz de Cristo a todas las personas y ser un lugar para el pueblo de Dios."

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]" // Made taller to allow movement without showing whitespace
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={data?.heroImage?.alternativeText || "Hero Background"}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/assets/thumbs/banner_bg2.png"
            alt="Default Hero Background"
            fill
            className="object-cover"
            priority
          />
        )}
      </motion.div>
      
      {/* Overlay - Darker gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-20">
        
        {/* Top Tag */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="mb-4"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"/>
            Juntos en Cristo
          </span>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Big Text */}
            <div className="lg:col-span-8">
                <motion.h1 
                  className="font-hero font-regular text-white uppercase leading-none tracking-normal"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block text-[clamp(4rem,10vw,8rem)] text-white">{titlePart1}</span>
                  <span className="block text-[clamp(4rem,10vw,8rem)] text-white">{titlePart2}</span>
                </motion.h1>
            </div>

            {/* Right Side: Info Block (visible on large screens, or stacked below) */}
            <div className="lg:col-span-4 lg:pl-8 flex flex-col justify-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2 uppercase !text-white tracking-widest">{dateText}</h3>
                    <p className="font-[family-name:var(--font-open-sans)] text-white text-sm md:text-lg leading-relaxed mb-6 font-normal">
                        {data?.heroSubtitle || smallText}
                    </p>
                    
                    <Link
                        href="/contacto"
                         className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all transform hover:translate-y-[-2px] shadow-lg hover:shadow-primary/30"
                    >
                        Contacto
                    </Link>
                </motion.div>
            </div>
        </div>

      </div>
    </div>
  );
}
