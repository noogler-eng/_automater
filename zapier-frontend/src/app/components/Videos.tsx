"use client";
import { useState, useEffect } from "react";
import videosWithData from "../utils/videoData";
import { motion, AnimatePresence } from "framer-motion";

export default function Videos() {
  const [current, setCurrent] = useState(videosWithData[0]);

  useEffect(() => {
    // Preload all videos
    videosWithData.forEach((video) => {
      if (video.link !== current.link) {
        const preloadVideo = document.createElement("video");
        preloadVideo.src = video.link;
        preloadVideo.preload = "auto";
      }
    });
  }, []);

  const handleVideoChange = (video: any) => {
    setCurrent(video);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 min-h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Dynamic glowing background */}
        <div className="absolute inset-0 bg-black">
          {/* Main gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-black to-orange-600/20"
            animate={{ 
              backgroundPosition: ["0% 10%", "100% 100%"],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          
          {/* Pulsing glow elements - orange */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"
            animate={{ 
              opacity: [0.05, 0.2, 0.05],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Pulsing glow elements - green */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-l from-orange-500/10 to-transparent"
            animate={{ 
              opacity: [0.05, 0.2, 0.05],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Diagonal orange glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent"
            animate={{ 
              opacity: [0.02, 0.15, 0.02],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
          
          {/* Diagonal green glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-bl from-transparent to-red-500/5"
            animate={{ 
              opacity: [0.02, 0.15, 0.02],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
              ease: "easeInOut"
            }}
          />
          
          {/* Pulsing center glow */}
          <motion.div
            className="absolute inset-0 bg-radial-gradient"
            style={{
              background: "radial-gradient(circle, rgba(255,153,0,0.05) 0%, rgba(34,139,34,0.05) 50%, rgba(0,0,0,0) 70%)",
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Color shift overlay */}
          <motion.div
            className="absolute inset-0 mix-blend-overlay"
            animate={{ 
              background: [
                "linear-gradient(45deg, rgba(255,153,0,0.05) 0%, rgba(34,139,34,0.05) 100%)",
                "linear-gradient(45deg, rgba(34,139,34,0.05) 0%, rgba(255,153,0,0.05) 100%)",
                "linear-gradient(45deg, rgba(255,153,0,0.05) 0%, rgba(34,139,34,0.05) 100%)"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated star field */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%", 
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: Math.random() * 3 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Video Player */}
        <motion.div 
          className="w-full aspect-video bg-black/80 overflow-hidden rounded-xl shadow-2xl border border-gray-800"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.link}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={current.link} type="video/mp4" />
              </video>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Video Selection Buttons */}
        <motion.div 
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {videosWithData.map((video, index) => (
            <motion.button
              key={index}
              onClick={() => handleVideoChange(video)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                video.name === current.name
                  ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/30"
                  : "bg-gray-900/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {video.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Video Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-amber-300 text-transparent bg-clip-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {current.name}
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {current.def}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}