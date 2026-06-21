import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { brand, products, assets } from '../config/assets';
import { ArrowRight, Bot, Zap, Shield, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ---- Interactive Pattern Background ---- */
function InteractivePatternBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) return null;

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * -60;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * -60;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: 'var(--bg-dark)', zIndex: 0 }}>
      {/* Base faint grid */}
      <motion.div 
        animate={{ backgroundPosition: `${parallaxX}px ${parallaxY}px` }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Highlight grid revealed by mouse */}
      <motion.div
        animate={{ backgroundPosition: `${parallaxX * 1.5}px ${parallaxY * 1.5}px` }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(var(--accent-blue) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />
      
      {/* Colored Spotlight */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(122, 0, 255, 0.08), transparent 50%)`
      }} />
    </div>
  );
}

/* ---- Stat Counter ---- */
function StatItem({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '3rem',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 800,
        background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>{value}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{label}</div>
    </div>
  );
}

/* ---- Feature Row ---- */
function FeatureItem({ icon: Icon, title, desc, color }) {
  return (
    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${color}15`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={24} color={color} />
      </div>
      <div>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{title}</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ---- Main Component ---- */
export default function Home() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based typography
      textRefs.current.forEach((text) => {
        if (!text) return;
        gsap.fromTo(text,
          { opacity: 0.15, y: 20 },
          {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: text, start: 'top 85%', end: 'top 50%', scrub: 1 },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const heroWords = brand.tagline.split(' ');

  return (
    <motion.div
      ref={containerRef}
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ======= HERO SECTION ======= */}
      <section style={{
        height: '100vh', position: 'relative', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Interactive Pattern Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <InteractivePatternBackground />
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%',
          background: 'linear-gradient(to top, var(--bg-dark), transparent)',
          zIndex: 1, pointerEvents: 'none',
        }} />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', padding: '0 2rem' }}>
          <div className="badge">
            <span className="dot" />
            Agents Online Now
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', marginBottom: '1.5rem' }}>
            {heroWords.map((word, i) => (
              <span key={i} style={{
                display: 'inline-block', marginRight: '0.4em',
                background: i === 0 || i === heroWords.length - 1
                  ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))'
                  : 'none',
                WebkitBackgroundClip: i === 0 || i === heroWords.length - 1 ? 'text' : undefined,
                WebkitTextFillColor: i === 0 || i === heroWords.length - 1 ? 'transparent' : undefined,
              }}>{word}</span>
            ))}
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            {brand.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn-primary">
              Explore Agents <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ======= STATS BAR ======= */}
      <section style={{
        padding: '4rem 2rem',
        display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 6rem)',
        flexWrap: 'wrap', position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <StatItem value="500+" label="Active AI Agents" />
        <StatItem value="12M+" label="Tasks Completed" />
        <StatItem value="99.9%" label="Uptime SLA" />
        <StatItem value="150+" label="Companies Served" />
      </section>

      {/* ======= SCROLL TYPOGRAPHY ======= */}
      <section style={{ padding: '10rem 2rem 6rem', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', lineHeight: 1.3, fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
          {['Your', 'business', 'runs', 'on', 'autopilot.', 'AI', 'agents', 'handle', 'social,', 'SEO,', 'content,', 'support,', 'and', 'growth', '—', 'so', 'you', 'focus', 'on', 'what', 'matters.'].map((word, idx) => (
            <span
              key={idx}
              ref={el => textRefs.current[idx] = el}
              style={{ display: 'inline-block', marginRight: '0.35em', color: 'var(--text-light)' }}
            >{word}</span>
          ))}
        </div>
      </section>

      {/* ======= VIDEO SHOWCASE ======= */}
      <section style={{ padding: '2rem 2rem 8rem', position: 'relative', zIndex: 2 }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
            <video
              ref={videoRef}
              src={assets.videos.heroReel}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(5,5,5,0.7), transparent 50%)',
              display: 'flex', alignItems: 'flex-end', padding: '3rem',
            }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>See Our Agents in Action</h3>
                <p style={{ color: 'var(--text-muted)' }}>Autonomous AI agents working together to grow your business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= FEATURED PRODUCTS PREVIEW ======= */}
      <section style={{ padding: '4rem 2rem 8rem', position: 'relative', zIndex: 2 }}>
        <div className="section-header">
          <h2>Meet Your AI Team</h2>
          <p>Each agent is an expert in its domain. Together, they form an autonomous growth engine for your business.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          margin: '0 auto',
        }}>
          {products.slice(0, 3).map((product) => {
            const ProductIcon = LucideIcons[product.icon] || LucideIcons.HelpCircle;
            return (
              <Link key={product.id} to="/products" className="glass" style={{
                padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
                textDecoration: 'none', cursor: 'pointer',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${product.color}15`, border: `1px solid ${product.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ProductIcon size={26} color={product.color} />
                </div>
                <h3 style={{ fontSize: '1.4rem' }}>{product.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{product.tagline}</p>
                <span style={{ color: product.color, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/products" className="btn-secondary">View All Agents <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* ======= WHY SOPA ======= */}
      <section style={{ padding: '6rem 2rem 8rem', position: 'relative', zIndex: 2 }}>
        <div style={{ width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Why {brand.name}?</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              We don't just build chatbots. We architect multi-agent systems that operate like a real team — with specialized roles, communication protocols, and autonomous decision-making.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <FeatureItem icon={Bot} title="Multi-Agent Architecture" desc="Each agent has a specific role. They collaborate, delegate, and escalate — just like a real team." color="#7a00ff" />
              <FeatureItem icon={Zap} title="Always-On Operations" desc="Your agents work 24/7/365. No breaks, no burnout. Just consistent, intelligent execution." color="#00e5ff" />
              <FeatureItem icon={Shield} title="Enterprise-Grade Security" desc="SOC 2 compliant, end-to-end encryption, and full audit trails on every agent action." color="#ffaa00" />
              <FeatureItem icon={TrendingUp} title="Measurable ROI" desc="Every agent action is tracked. See exactly how much revenue and time your agents generate." color="#00ff88" />
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '1/1' }}>
            <video
              src={assets.videos.agentDemo}
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ======= CTA SECTION ======= */}
      <section style={{
        padding: '8rem 2rem', textAlign: 'center', position: 'relative', zIndex: 2,
        background: 'radial-gradient(ellipse at center, rgba(122,0,255,0.08) 0%, transparent 70%)',
      }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>
          Ready to Put Your Business on Autopilot?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Start with one agent. Scale to a full AI workforce. No code required.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn-primary">Get Started Free <ArrowRight size={16} /></Link>
          <Link to="/products" className="btn-secondary">See All Agents</Link>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="footer">
        <p>© 2026 {brand.name}. All rights reserved. Built with autonomous AI.</p>
      </footer>
    </motion.div>
  );
}
