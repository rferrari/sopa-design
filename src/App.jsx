import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

import { lazy, Suspense } from 'react';
import { brand } from './config/assets';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));

function LoadingScreen() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-dark)',
    }}>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          background: 'linear-gradient(135deg, #7a00ff, #00e5ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {brand.name}
      </motion.div>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/">{brand.name}</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/team">Team</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ReactLenis root>
      <Router>
        <Navigation />
        <Suspense fallback={<LoadingScreen />}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </ReactLenis>
  );
}

export default App;
