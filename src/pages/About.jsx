import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand, assets } from '../config/assets';
import { ArrowRight, Bot, Brain, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2023', title: 'The Spark', text: 'Founded by a team of AI researchers and growth engineers who believed agencies should run themselves.' },
  { year: '2024', title: 'First Agents Go Live', text: 'Deployed our first multi-agent system handling social media for 20 clients simultaneously.' },
  { year: '2025', title: 'Series A & Scale', text: 'Raised $18M to expand our agent platform to SEO, content, support, and analytics domains.' },
  { year: '2026', title: 'The AI Workforce', text: 'Now powering 150+ companies with autonomous AI teams that operate 24/7 across all digital channels.' },
];

export default function About() {
  const containerRef = useRef();
  const shapeRef = useRef();
  const meshRef = useRef();
  const textRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Shape morphing on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-morph-section',
          start: 'top center',
          end: '+=1500',
          scrub: 1,
        },
      });

      tl.to(shapeRef.current, { borderRadius: '50%', rotate: 180, scale: 0.6, backgroundColor: '#ff007f', duration: 1 })
        .to(shapeRef.current, { borderRadius: '15%', rotate: 360, scale: 1.2, backgroundColor: '#7a00ff', duration: 1 })
        .to(meshRef.current, { backgroundPosition: '100% 100%', duration: 2 }, 0);

      // Timeline items reveal
      textRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 60%', scrub: 1 },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '8rem' }}
    >
      {/* Gradient Mesh Background */}
      <div
        ref={meshRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '200%', height: '200%', zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 30% 40%, rgba(122,0,255,0.08), transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,229,255,0.06), transparent 50%)',
          backgroundSize: '200% 200%',
          filter: 'blur(60px)',
        }}
      />

      {/* Hero Section with Video */}
      <section style={{ padding: '2rem 2rem 6rem', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <div className="glass" style={{
            borderRadius: '24px', overflow: 'hidden', aspectRatio: '21/9',
            position: 'relative',
          }}>
            <video
              src={assets.videos.backgroundLoop}
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 60%, transparent)',
              display: 'flex', alignItems: 'center', padding: '4rem',
            }}>
              <div style={{ maxWidth: '650px' }}>
                <div className="badge"><span className="dot" /> Our Story</div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem' }}>
                  We're Building the <span style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Agency of the Future</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {brand.name} was born from a simple question: what if every business had access to a team of AI specialists that never stops working?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shape Morph + Timeline Section */}
      <section className="about-morph-section" style={{
        padding: '6rem 2rem', position: 'relative', zIndex: 1,
        display: 'flex', gap: '6rem', width: '100%', margin: '0 auto', alignItems: 'flex-start',
      }}>
        {/* Timeline */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Our Journey</h2>
          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--glass-border)' }}>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                ref={el => textRefs.current[i] = el}
                style={{ marginBottom: '3rem', position: 'relative' }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-2.6rem', top: '0.3rem',
                  width: 12, height: 12, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
                  boxShadow: '0 0 10px rgba(122,0,255,0.5)',
                }} />
                <span style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em' }}>{m.year}</span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.3rem 0 0.5rem' }}>{m.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Morphing Shape */}
        <div style={{ flex: 0.6, display: 'flex', justifyContent: 'center', position: 'sticky', top: '30vh' }}>
          <div
            ref={shapeRef}
            style={{
              width: '280px', height: '280px',
              backgroundColor: 'var(--accent-blue)',
              borderRadius: '30%',
              boxShadow: '0 0 80px rgba(0, 229, 255, 0.2)',
              transition: 'box-shadow 0.5s ease',
            }}
          />
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 2rem 8rem', position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <h2>What Drives Us</h2>
          <p>Our principles guide every agent we build and every decision we make.</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem', width: '100%', margin: '0 auto',
        }}>
          {[
            { icon: Bot, color: '#7a00ff', title: 'AI-First Thinking', desc: 'We start every project by asking: can an agent do this?' },
            { icon: Brain, color: '#00e5ff', title: 'Research-Driven', desc: 'Our agents are built on peer-reviewed multi-agent architectures.' },
            { icon: Users, color: '#ff007f', title: 'Human-Centric', desc: 'AI amplifies humans. It doesn\'t replace the creative spark.' },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="glass" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: `${v.color}15`, border: `1px solid ${v.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <Icon size={32} color={v.color} />
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA to Team */}
      <section style={{
        padding: '8rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1,
        background: 'radial-gradient(ellipse at center, rgba(122,0,255,0.06) 0%, transparent 70%)',
      }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
          Meet the Humans
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Our AI agents are built by a world-class team of researchers, engineers, and growth experts.
        </p>
        <Link to="/team" className="btn-primary">Meet the Team <ArrowRight size={16} /></Link>
      </section>

      <footer className="footer" style={{ position: 'relative', zIndex: 1 }}>
        <p>© 2026 {brand.name}. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}
