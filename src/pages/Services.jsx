import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brand, assets } from '../config/assets';
import { Bot, Zap, Shield, TrendingUp, Workflow, Brain, Users, BarChart3, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import newly added service assets
import imgArchitecture from '../assets/architecture-5373-183629075_medium.mp4';
import imgGrowth from '../assets/growth-business-5475664_1920.jpg';
import imgStrategy from '../assets/strategy-pexels-king-1846807_1920.jpg';
import imgWorkflow from '../assets/workflow-artificial-intelligence-10207363_1920.jpg';
import imgSecurity from '../assets/security--hacker-3480124_1920.jpg';
import imgAnalytics from '../assets/compass-2779371_1920.jpg';
import imgHitl from '../assets/HITL-button-4203036_1920.jpg';
import imgDeployment from '../assets/development-programming-1873854_1920.png';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    icon: Bot,
    title: "Agent Architecture",
    description: "We design multi-agent systems with specialized roles. Each agent has memory, tools, and decision-making autonomy.",
    media: imgArchitecture,
    color: "#7a00ff"
  },
  {
    icon: TrendingUp,
    title: "Growth Automation",
    description: "Autonomous A/B testing, funnel optimization, and conversion rate improvements — 24/7.",
    media: imgGrowth,
    color: "#00e5ff"
  },
  {
    icon: Brain,
    title: "AI Strategy Consulting",
    description: "Identify where AI agents can replace manual workflows across your organization.",
    media: imgStrategy,
    color: "#ff007f"
  },
  {
    icon: Workflow,
    title: "Workflow Orchestration",
    description: "Chain agents together to build end-to-end automated pipelines.",
    media: imgWorkflow,
    color: "#00ff88"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "SOC 2, GDPR, and HIPAA compliant agent infrastructure with full audit trails.",
    media: imgSecurity,
    color: "#ffaa00"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Real-time dashboards showing agent performance, ROI, and business impact.",
    media: imgAnalytics,
    color: "#ff5500"
  },
  {
    icon: Users,
    title: "Human-in-the-Loop",
    description: "Set approval gates for critical decisions. Your team stays in control while agents handle the rest.",
    media: imgHitl,
    color: "#00e5ff"
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    description: "Go from concept to production in weeks, not months. Our platform handles infrastructure, scaling, and monitoring so you ship fast.",
    media: imgDeployment,
    color: "#7a00ff"
  }
];

export default function Services() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.service-panel');
      
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: '8rem', paddingBottom: '0' }} // Removed bottom padding for edge-to-edge footer
    >
      {/* Hero Section with Video */}
      <section style={{ padding: '2rem 2rem 4rem', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', margin: '0 auto' }}>
          <div className="glass" style={{
            borderRadius: '24px', overflow: 'hidden', aspectRatio: '21/9',
            marginBottom: '4rem', position: 'relative',
          }}>
            <video
              src={assets.videos.agentDemo}
              autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 60%, transparent)',
              display: 'flex', alignItems: 'center', padding: '4rem',
            }}>
              <div style={{ maxWidth: '500px' }}>
                <div className="badge"><span className="dot" /> What We Do</div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
                  Services & Capabilities
                </h1>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  From strategy to execution, our AI agent platform covers every facet of your digital operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Scroll Snapping Sections */}
      <section ref={containerRef} style={{ position: 'relative' }}>
        {servicesList.map((svc, i) => (
          <div key={i} className="service-panel" style={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#000',
            // Negative margin to pull it edge-to-edge if the parent has padding
            marginLeft: 'calc(-50vw + 50%)',
          }}>
            {/* Background Media */}
            {svc.media.endsWith('.mp4') ? (
              <video
                src={svc.media}
                autoPlay muted loop playsInline
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, zIndex: 0 }}
              />
            ) : (
              <img
                src={svc.media}
                alt={svc.title}
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, zIndex: 0 }}
              />
            )}
            
            {/* Dark Gradient Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.2) 60%, transparent)', zIndex: 1 }} />
            
            {/* Content Area */}
            <div style={{ position: 'absolute', bottom: '15%', left: '10%', zIndex: 2, maxWidth: '700px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 18,
                    background: `${svc.color}15`, border: `1px solid ${svc.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'
                  }}>
                    <svc.icon size={36} color={svc.color} />
                  </div>
                  <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{svc.title}</h2>
               </div>
               <p style={{ fontSize: '1.25rem', color: '#e5e5e5', lineHeight: 1.7, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                 {svc.description}
               </p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer & CTA pushed to bottom */}
      <div style={{ position: 'relative', zIndex: 10, background: 'var(--bg-dark)' }}>
        <section style={{
          padding: '8rem 2rem 4rem', textAlign: 'center',
          background: 'radial-gradient(ellipse at center, rgba(255,0,127,0.06) 0%, transparent 70%)',
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Who's Behind the Agents?
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Learn more about our vision, our story, and the principles that drive our autonomous AI platform.
          </p>
          <Link to="/about" className="btn-primary">Our Story <ArrowRight size={16} /></Link>
        </section>

        <footer className="footer" style={{ borderTop: '1px solid var(--border)' }}>
          <p>© 2026 {brand.name}. All rights reserved.</p>
        </footer>
      </div>
    </motion.div>
  );
}
