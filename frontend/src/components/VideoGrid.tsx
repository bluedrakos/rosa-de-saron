"use client";

import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  speaker?: string;
  date: string;
}

interface VideoGridProps {
  videos: Video[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {videos.map((video) => (
        <motion.div key={video.id} variants={item}>
          <VideoPlayer
            title={video.title}
            videoUrl={video.videoUrl}
            speaker={video.speaker}
            date={video.date}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
