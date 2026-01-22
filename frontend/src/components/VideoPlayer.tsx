"use client";

import { useState, useEffect } from "react";
import { PlayCircle, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface VideoPlayerProps {
  title: string;
  videoUrl: string;
  speaker?: string;
  date: string;
}

export default function VideoPlayer({ title, videoUrl, speaker, date }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isPlaying) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPlaying]);

  // Helper to extract YouTube ID
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

  // Warm up connection on hover
  const warmUpConnection = () => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://www.youtube.com";
    document.head.appendChild(link);

    const linkImg = document.createElement("link");
    linkImg.rel = "preconnect";
    linkImg.href = "https://img.youtube.com";
    document.head.appendChild(linkImg);
  };

  return (
    <>
      <div 
        className="group cursor-pointer" 
        onClick={() => setIsPlaying(true)}
        onMouseEnter={warmUpConnection}
      >
        <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4 shadow-lg">
          {thumbnailUrl ? (
            <Image 
              src={thumbnailUrl} 
              alt={title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary text-white">
              <PlayCircle className="h-12 w-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h4 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">{title}</h4>
        <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide">
          {speaker && <>{speaker} • </>}
          {date}
        </p>
      </div>

      {/* Modal Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isPlaying && videoId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPlaying(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden z-10"
              >
                 <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
