import { motion } from 'framer-motion';
import '../App.css'; // Ensure styles are available

export default function HeroVideo({ 
  videoSrc, 
  title, 
  subtitle, 
  children,
  textColor = 'light', // 'light' means white text (dark mode style), 'dark' means black text
  className = '',
  style = {}
}) {
  // Determine which outline class to use based on the textColor preference
  const textClass = textColor === 'light' ? 'hero-text-light' : 'hero-text-dark';

  return (
    <div className={`hero-video-container ${className}`} style={style}>
      <video
        className="hero-video-bg"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Subtle overlay to ensure some contrast even without outline */}
      <div className="hero-video-overlay" />
      
      <div className="hero-video-content">
        {title && (
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`hero-video-title ${textClass}`}
          >
            {title}
          </motion.h1>
        )}
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`hero-video-subtitle ${textClass}`}
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-video-children"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
