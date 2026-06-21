import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { teamMembers, brand, assets } from '../config/assets';
import { ArrowRight, ChevronLeft, ChevronRight, User } from 'lucide-react';
import HeroVideo from '../components/HeroVideo';

/* ---- 3D Carousel Character Select ---- */
function TeamCarousel() {
  const [selected, setSelected] = useState(0);
  const count = teamMembers.length;

  const prev = () => setSelected((s) => (s - 1 + count) % count);
  const next = () => setSelected((s) => (s + 1) % count);

  // Calculate position for each card in the 3D ring
  const getCardStyle = (index) => {
    let diff = index - selected;
    // Wrap around
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    const angle = diff * (360 / count);
    const radius = 420; // distance from center
    const rad = (angle * Math.PI) / 180;

    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad) * radius - radius; // push back
    const scale = Math.max(0.5, 1 + z / (radius * 2));
    const opacity = Math.abs(diff) <= 2 ? 1 : 0.3;
    const zIndex = Math.round(scale * 100);

    return {
      x,
      z,
      scale,
      opacity,
      zIndex,
      rotateY: -angle * 0.3,
    };
  };

  const member = teamMembers[selected];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
      
      {/* 3D Stage */}
      <div style={{
        width: '100%', maxWidth: '900px', height: '480px',
        perspective: '1200px',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Navigation Arrows */}
        <button
          onClick={prev}
          style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%', width: 52, height: 52,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 200, backdropFilter: 'blur(10px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        >
          <ChevronLeft size={24} color="#fff" />
        </button>
        <button
          onClick={next}
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%', width: 52, height: 52,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 200, backdropFilter: 'blur(10px)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        >
          <ChevronRight size={24} color="#fff" />
        </button>

        {/* Cards */}
        <div style={{
          position: 'relative', width: '280px', height: '380px',
          transformStyle: 'preserve-3d',
        }}>
          {teamMembers.map((m, i) => {
            const s = getCardStyle(i);
            const isActive = i === selected;
            return (
              <motion.div
                key={m.name}
                onClick={() => setSelected(i)}
                animate={{
                  x: s.x,
                  scale: s.scale,
                  opacity: s.opacity,
                  rotateY: s.rotateY,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '280px', height: '380px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  zIndex: s.zIndex,
                  border: isActive ? `2px solid ${m.color}` : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isActive
                    ? `0 0 60px ${m.color}30, 0 20px 60px rgba(0,0,0,0.5)`
                    : '0 10px 40px rgba(0,0,0,0.4)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image or Avatar Placeholder */}
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: `linear-gradient(135deg, ${m.color}30 0%, ${m.color}08 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '0.5rem',
                  }}>
                    <div style={{
                      width: 120, height: 120, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${m.color}50, ${m.color}20)`,
                      border: `2px solid ${m.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <User size={56} color={m.color} strokeWidth={1.5} />
                    </div>
                    <span style={{ color: m.color, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', marginTop: '0.5rem' }}>
                      COMING SOON
                    </span>
                  </div>
                )}

                {/* Bottom gradient with name */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '3rem 1.5rem 1.5rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#fff' }}>{m.name}</h3>
                  <p style={{ color: m.color, fontSize: '0.8rem', fontWeight: 600, margin: '0.2rem 0 0' }}>{m.role}</p>
                </div>

                {/* Active glow ring */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      position: 'absolute', inset: -2,
                      borderRadius: '24px',
                      border: `2px solid ${m.color}`,
                      boxShadow: `inset 0 0 30px ${m.color}20`,
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Character Info Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            textAlign: 'center', maxWidth: '600px', padding: '0 2rem',
          }}
        >
          {/* Selection dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {teamMembers.map((m, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  width: i === selected ? 32 : 10, height: 10,
                  borderRadius: 5, border: 'none',
                  background: i === selected ? m.color : 'rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <h2 style={{ fontSize: '2rem', margin: '0 0 0.3rem' }}>{member.name}</h2>
          <p style={{ color: member.color, fontSize: '1rem', fontWeight: 600, margin: '0 0 1rem' }}>{member.role}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>{member.bio}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Team() {
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
        videoSrc={assets.videos.heroReel}
        title="Our Team"
        subtitle="A blend of AI researchers, engineers, designers, and growth experts building the future of autonomous work."
        className="team-hero"
        style={{ height: '60vh', minHeight: '400px', borderRadius: '24px', margin: '2rem', marginBottom: '4rem' }}
      >
        <div className="badge" style={{ margin: '0 auto 1.5rem' }}><span className="dot" /> The Humans Behind the Agents</div>
      </HeroVideo>

      {/* 3D Character Select Carousel */}
      <section style={{
        padding: '2rem 2rem 8rem',
        background: 'radial-gradient(ellipse at center top, rgba(122,0,255,0.04) 0%, transparent 60%)',
      }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <div className="badge"><span className="dot" /> Select a Character</div>
          <h2>Choose Your Agent Master</h2>
          <p>Click or use the arrows to explore the team.</p>
        </div>
        <TeamCarousel />
      </section>

      {/* Contact Us CTA */}
      <section style={{
        padding: '6rem 2rem 8rem', textAlign: 'center',
        background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 70%)',
      }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Ready to Talk?</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Whether you want to deploy your first AI agent or join our team, we'd love to hear from you.
        </p>
        <Link to="/contact" className="btn-primary">
          Contact Us <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="footer">
        <p>© 2026 {brand.name}. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}
