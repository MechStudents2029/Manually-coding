Northstar — Interactive 3D AI Agent Landing Page

Original Problem Statement

Build an interactive landing experience for an AI agent product with:
- React frontend talking to FastAPI
- Claude-powered agent responses
- Modes / conversation continuity as the backend grows
- A distinctive robot-facing UI

User Choices

- Retro robot avatar with Ice Blue styling
- Vite + React frontend
- FastAPI backend with Anthropic Claude (Fable 5)

Architecture (implemented)

- frontend/src — Vite React UI (HeroSection, ChatSection, RobotFace)
- backend/main.py — FastAPI /api/health, /api/submit, /api/submissions
- backend/agent.py — Claude integration with mode prompts

Implemented (2026-07-15)

- Robot chat UI and submission history
- Health endpoint and submit pipeline
- Server-side Anthropic key via environment / .env

Backlog / Next

- Supabase chat persistence when the UI is ready for multi-chat
- Explicit “Remember this” preferences
- Fill backend/.env with ANTHROPIC_API_KEY for live replies
