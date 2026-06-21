# Agent Instructions: SOPA Design System

## Core Architecture
- **Framework**: React + Vite [1, 2].
- **Language**: JavaScript (preferring functional components).
- **Styling**: High-fidelity CSS focus, maintaining a balance between Light and Dark modes.

## Global UI Requirements
1. **Persistent Header**: All pages MUST import and use the same `<Header />` component to ensure navigation consistency.
2. **Hero Section**: Every top-level page must feature a full-bleed cinematic Hero banner with centralized typography and dual-action buttons.
3. **Particle System**: Use a canvas-based particle background for Hero sections to convey a "living" interface.
4. **Iconography**: Strictly use the designated Icon Pack (e.g., Lucide-React or Phosphor) to maintain visual weight consistency.

## Layout Logic
- **Bento Grids**: Use modular, asymmetrical grids for service sections with border-radius between 12-24px.
- **High-Fidelity Aesthetic**: Priority on generous whitespace, precise kerning, and smooth transitions.
