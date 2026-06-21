// Asset configuration — swap these paths to update the site globally
// All local assets should be placed in src/assets/

export const assets = {
  videos: {
    // Local video assets from src/assets/
    heroReel: '/src/assets/137306-766326277_medium.mp4',
    productScrub: '/src/assets/1006-142621176_medium.mp4',
    agentDemo: '/src/assets/137263-766326223_medium.mp4',
    backgroundLoop: '/src/assets/336149_medium.mp4',
    showcase: '/src/assets/356398_medium.mp4',
  },
  images: {
    heroFallback: '/src/assets/photo-1618005182384-a83a8bd57fbe.avif',
    abstract1: '/src/assets/photo-1550684848-fac1c5b4e853.avif',
    teamMember1: '/src/assets/arttower-girl-2663376_1920.jpg',
    teamMember2: '/src/assets/heibe-rio-1303951_1920.jpg',
    team1: '/src/assets/team1.jpg',
    team2: '/src/assets/team2.jpg',
    team3: '/src/assets/team3.jpg',
    logo: '/src/assets/hero.png',
  },
  models: {
    product3D: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
  },
};

// Brand configuration
export const brand = {
  name: 'SOPA',
  tagline: 'AI Agents That Work While You Sleep',
  description: 'We build autonomous AI agent teams that handle your social media, SEO, content creation, customer support, and growth — 24/7.',
  email: 'hello@sopa.agency',
  website: 'sopa.agency',
  location: 'São Paulo, Brazil',
};

// Products / AI Agent offerings
export const products = [
  {
    id: 'social-agent',
    name: 'Social Agent',
    tagline: 'Autonomous Social Media Management',
    description: 'An AI agent that creates, schedules, and publishes content across all your social platforms. It learns your brand voice and engages with your audience in real-time.',
    icon: 'Smartphone',
    color: '#7a00ff',
    features: ['Auto-posting across platforms', 'Brand voice learning', 'Engagement & reply automation', 'Analytics dashboard'],
  },
  {
    id: 'seo-agent',
    name: 'SEO Agent',
    tagline: 'Intelligent Search Optimization',
    description: 'Continuously audits your site, discovers keyword opportunities, optimizes content, and builds authority — all on autopilot.',
    icon: 'Search',
    color: '#00e5ff',
    features: ['Technical SEO audits', 'Keyword research & targeting', 'Content optimization', 'Backlink strategy'],
  },
  {
    id: 'content-agent',
    name: 'Content Agent',
    tagline: 'AI-Powered Content Factory',
    description: 'Generates blog posts, newsletters, video scripts, and marketing copy that sounds like your team wrote it.',
    icon: 'PenTool',
    color: '#ff007f',
    features: ['Blog & article generation', 'Newsletter automation', 'Video script writing', 'Multi-language support'],
  },
  {
    id: 'support-agent',
    name: 'Support Agent',
    tagline: '24/7 Customer Intelligence',
    description: 'Handles customer inquiries, resolves tickets, and escalates intelligently. Learns from every interaction to get smarter over time.',
    icon: 'MessageSquare',
    color: '#00ff88',
    features: ['Ticket resolution', 'Live chat automation', 'Knowledge base building', 'Sentiment analysis'],
  },
  {
    id: 'analytics-agent',
    name: 'Analytics Agent',
    tagline: 'Real-Time Business Intelligence',
    description: 'Monitors all your data streams, spots trends before they happen, and delivers actionable insights directly to your team.',
    icon: 'LineChart',
    color: '#ffaa00',
    features: ['Cross-platform analytics', 'Predictive insights', 'Automated reporting', 'Anomaly detection'],
  },
  {
    id: 'growth-agent',
    name: 'Growth Agent',
    tagline: 'Autonomous Growth Hacking',
    description: 'Runs experiments, A/B tests, and optimization loops across your funnels to maximize conversion and revenue.',
    icon: 'Rocket',
    color: '#ff5500',
    features: ['A/B testing automation', 'Funnel optimization', 'Lead scoring', 'Revenue attribution'],
  },
];

// Team members
export const teamMembers = [
  { name: 'Nakamura', role: 'CEO & AI Architect', seed: 12.5, color: '#7a00ff', bio: 'Former Google DeepMind researcher. Building the future of autonomous AI.', image: '/src/assets/team1.jpg' },
  { name: 'Lucas', role: 'CTO & Platform Lead', seed: 42.1, color: '#00e5ff', bio: '15 years in distributed systems. Makes AI agents talk to each other.', image: '/src/assets/team2.jpg' },
  { name: 'Maya', role: 'Head of Design', seed: 7.8, color: '#ff007f', bio: 'Ex-Apple design lead. Believes AI should feel invisible and magical.', image: '/src/assets/team3.jpg' },
  { name: 'R4to', role: 'Head of Growth', seed: 23.4, color: '#00ff88', bio: 'Scaled 3 startups to $100M ARR. Now letting AI do it faster.' },
  { name: 'Vlad', role: 'ML Engineering Lead', seed: 31.2, color: '#ffaa00', bio: 'Published 20+ papers on multi-agent systems. Turns research into products.' },
  { name: 'Ferrari', role: 'Agent Ops Lead', seed: 55.7, color: '#ff5500', bio: 'DevOps veteran turned AgentOps pioneer. Keeps the swarm running 24/7.' },
];
