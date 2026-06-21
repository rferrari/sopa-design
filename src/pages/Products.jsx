import { useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products, assets, brand } from '../config/assets';
import { ArrowRight, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import HeroVideo from '../components/HeroVideo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product, index }) {
  const cardRef = useRef();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }); }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      animate={{
        rotateX: hovered ? -pos.y / 15 : 0,
        rotateY: hovered ? pos.x / 15 : 0,
      }}
      className="glass"
      style={{
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px',
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at ${pos.x + (cardRef.current?.offsetWidth || 0) / 2}px ${pos.y + (cardRef.current?.offsetHeight || 0) / 2}px, ${product.color}15, transparent 60%)`,
        }}
      />

      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: `${product.color}15`, border: `1px solid ${product.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '0.5rem',
      }}>
        {(() => {
          const Icon = LucideIcons[product.icon] || LucideIcons.HelpCircle;
          return <Icon size={28} color={product.color} />;
        })()}
      </div>

      <div>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>{product.name}</h3>
        <p style={{ color: product.color, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          {product.tagline}
        </p>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
        {product.description}
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
        {product.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Check size={14} color={product.color} /> {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Products() {
  const horizontalRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const el = horizontalRef.current;
      if (!el) return;
      
      const totalWidth = el.scrollWidth - window.innerWidth;
      
      gsap.to(el, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '8rem' }}
    >
      {/* Hero Section with Video */}
      <HeroVideo
        videoSrc={assets.videos.productScrub}
        title="AI Agents for Every Function"
        subtitle="Each agent specializes in a domain. Combine them into a custom AI workforce tailored to your business needs."
        className="products-hero"
        style={{ height: '60vh', minHeight: '400px', borderRadius: '24px', margin: '2rem', marginBottom: '4rem' }}
      >
        <div className="badge" style={{ margin: '0 auto 1.5rem' }}>
          <span className="dot" /> {products.length} Agents Available
        </div>
      </HeroVideo>

      {/* Horizontal Scroll Agents Section */}
      <section ref={wrapperRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div ref={horizontalRef} style={{ display: 'flex', gap: '2rem', padding: '0 4rem', width: 'max-content' }}>
          {products.map((product, i) => (
            <div key={product.id} style={{ width: '400px', flexShrink: 0 }}>
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '8rem 2rem', textAlign: 'center',
        background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 70%)',
      }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
          Need a Custom Agent?
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          We build bespoke AI agents for unique business requirements. Tell us what you need.
        </p>
        <Link to="/contact" className="btn-primary">Talk to Us <ArrowRight size={16} /></Link>
      </section>

      <footer className="footer">
        <p>© 2026 {brand.name}. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}
