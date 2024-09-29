import React, { useRef, useEffect } from 'react';
import videoSrc from './video.mp4';

const VideoPlayer = () => {
  // Create a reference for the video element
  const videoRef = useRef(null);

  // Function to play the video
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Automatically play video when the component mounts
  useEffect(() => {
    playVideo();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        width="1000"
        autoPlay loop
        
        muted
   
        // `autoPlay` makes the video start automatically
        // `muted` is required for autoplay to work in many browsers
     className='flex px-65 align-center justify-center border-stone-900' >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
