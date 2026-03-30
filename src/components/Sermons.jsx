import React, { useEffect, useRef, useState } from 'react';
import { revealOnScroll } from '../utils/revealOnScroll';

function Sermons() {
  const [videoIds, setVideoIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headerRef = useRef(null);

  // YouTube API configuration
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  // Fetch latest videos
  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        setLoading(true);
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=id&order=date&maxResults=3&type=video`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message || 'Failed to fetch videos');
        }
        
        const ids = data.items.map(item => item.id.videoId);
        setVideoIds(ids);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching videos:', err);
        // Fallback to default videos if API fails
        setVideoIds(['HpAvBIwbUOI', 'uZz9JPXtNFg']);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideos();
  }, []);

  // Setup scroll animations
  useEffect(() => {
    if (!headerRef.current) return;
    
    const cleanupHeader = revealOnScroll(headerRef.current, { 
      threshold: 0.15, 
      rootMargin: '0px 0px -10% 0px', 
      once: true 
    });
    
    // Wait for videos to load before setting up iframe animations
    if (!loading) {
      const cleanupIframes = revealOnScroll('.sermon-iframe', { 
        threshold: 0.12, 
        rootMargin: '0px 0px -10% 0px', 
        once: true 
      });
      const cleanupButton = revealOnScroll('.sermon-button', { 
        threshold: 0.2, 
        rootMargin: '0px 0px -5% 0px', 
        once: true 
      });

      return () => {
        if (cleanupHeader) cleanupHeader();
        if (cleanupIframes) cleanupIframes();
        if (cleanupButton) cleanupButton();
      };
    }

    return () => {
      if (cleanupHeader) cleanupHeader();
    };
  }, [loading]);

  // Render loading state
  if (loading) {
    return (
      <section id="sermons" className="section__container-light">
        <h2 ref={headerRef} className="section__header-primary sermons__header">
          WATCH OUR LATEST MESSAGES
        </h2>
        <div className="video-container loading-container">
          <div className="loading-spinner"></div>
          <p>Loading latest messages...</p>
        </div>
      </section>
    );
  }

  // Render error state (optional - you can remove this if you prefer the fallback videos)
  if (error) {
    console.warn('Using fallback videos due to API error:', error);
  }

  return (
    <section id="sermons" className="section__container-light">
      <h2 ref={headerRef} className="section__header-primary sermons__header">
        WATCH OUR LATEST MESSAGES
      </h2>
      
      <div className="video-container">
        {videoIds.map((videoId, index) => (
          <iframe
            key={videoId}
            className="sermon-iframe"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`YouTube video player ${index + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ))}
      </div>

      <a 
        className="sermon-button" 
        href="https://www.youtube.com/@ecmimakati" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        See more
      </a>
    </section>
  );
}

export default Sermons;