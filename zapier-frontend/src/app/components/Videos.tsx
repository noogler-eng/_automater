"use client";
import { useState, useEffect, useRef } from "react";
import videosWithData from "../utils/videoData";
import clsx from "clsx";

export default function Videos() {
  const [current, setCurrent] = useState<{
    name: string;
    link: string;
    def: string;
  }>(videosWithData[0]);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const preloadRef = useRef<HTMLVideoElement>(null);

  // Preload next videos
  useEffect(() => {
    videosWithData.forEach((video) => {
      if (video.link !== current.link) {
        // creating an preload element of video where we store the next video
        const preloadVideo = document.createElement("video");
        preloadVideo.src = video.link;
        preloadVideo.preload = "auto";
      }
    });
  }, []);

  // this is timeout we are taking while video is preloading
  // we are waiting for 1 ms
  // after preloading we will return
  // this will for only for this component as useEffect is only in this component
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleVideoChange = (video: typeof current) => {
    setIsTransitioning(true);
    setCurrent(video);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[800px] h-[450px] bg-black overflow-hidden">
        <video
          key={current.link}
          // while the video is preloading it will show you opaque or black screen for 1ms
          className={clsx(
            "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={current.link} type="video/mp4" />
        </video>

        {/* Hidden preload container */}
        <div className="hidden">
          <video ref={preloadRef}>
            {videosWithData.map((video) => (
              <source key={video.link} src={video.link} type="video/mp4" />
            ))}
          </video>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        {videosWithData.map((video, index) => (
          <button
            key={index}
            onClick={() => handleVideoChange(video)}
            className={clsx(
              "px-4 py-2 text-sm rounded-full transition-colors duration-300",
              video.name === current.name
                ? "bg-orange-700 text-white"
                : "border border-orange-700 hover:bg-orange-700 hover:text-white"
            )}
            disabled={isTransitioning}
          >
            {video.name}
          </button>
        ))}
      </div>
          
      <div className="text-wrap">{current.def}</div>
    </div>
  );
}
