import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brand, assets } from '../config/assets';
import { Mail, Globe, MessageCircle, MapPin, Send, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, hook this up to your API
  };

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
      <section style={{ padding: '2rem 2rem 4rem', position: 'relative' }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <div className="glass" style={{
            borderRadius: '24px', overflow: 'hidden', aspectRatio: '21/9',
            marginBottom: '4rem', position: 'relative',
          }}>
            <video
              src={assets.videos.showcase}
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 60%, transparent)',
              display: 'flex', alignItems: 'center', padding: '4rem',
            }}>
              <div style={{ maxWidth: '500px' }}>
                <div className="badge"><span className="dot" /> Let's Talk</div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
                  Get in Touch
                </h1>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Ready to deploy your first AI agent? Have questions? We'd love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section style={{ padding: '0 2rem 8rem' }}>
        <div style={{
          width: '100%', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Contact Form */}
          <div className="glass" style={{ padding: '3rem', borderRadius: '24px' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Book a Demo</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Fill out the form and we'll schedule a personalized walkthrough of our agent platform.
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
                      border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)',
                      color: 'var(--text-light)', fontSize: '0.95rem', outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
                      border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)',
                      color: 'var(--text-light)', fontSize: '0.95rem', outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
                      border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)',
                      color: 'var(--text-light)', fontSize: '0.95rem', outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%', padding: '0.8rem 1rem', borderRadius: '12px',
                      border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)',
                      color: 'var(--text-light)', fontSize: '0.95rem', outline: 'none',
                      resize: 'vertical', fontFamily: 'inherit',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
                    onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Our team will get back to you within 24 hours.
                </p>
                <Link to="/" className="btn-secondary">Back to Home <ArrowRight size={16} /></Link>
              </div>
            )}
          </div>

          {/* Contact Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: Mail, label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
              { icon: Globe, label: 'Website', value: brand.website, href: `https://${brand.website}` },
              { icon: MapPin, label: 'Location', value: brand.location, href: null },
              { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7 via our AI agent', href: null },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass"
                style={{
                  padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'center',
                  cursor: item.href ? 'pointer' : 'default',
                }}
                onClick={() => item.href && window.open(item.href, '_blank')}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <item.icon size={24} color="var(--accent-blue)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
                  <p style={{ fontSize: '1.05rem', marginTop: '0.2rem' }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 {brand.name}. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}
