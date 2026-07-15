import { useLenis } from "../hooks/useLenis";
import Experience from "../three/Experience";
import { motion, useTransform } from "framer-motion";
import { RANGE, MODES } from "../lib/constants";
import { progressMV, scrollToFraction } from "../lib/scrollStore";
import { ArrowDown, Sparkles, MessageCircle } from "lucide-react";
import Marquee from "react-fast-marquee";

/* ---------- scroll-linked fixed overlay panel ---------- */
function Panel({ pts, children, className = "", justify = "center" }) {
  const opacity = useTransform(progressMV, pts, [0, 1, 1, 0]);
  const y = useTransform(progressMV, pts, [70, 0, 0, -70]);
  return (
    <motion.div
      style={{ opacity, y, zIndex: 10 }}
      className={`fixed inset-0 flex items-center pointer-events-none ${justify} ${className}`}
    >
      {children}
    </motion.div>
  );
}

const LABEL = "text-xs tracking-[0.28em] uppercase font-mono text-cyan-400";

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/70 border-b border-white/10"
      data-testid="site-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5" data-testid="brand-logo">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-violet-500 to-cyan-400" />
          </span>
          <span className="font-semibold tracking-tight text-lg">
            Northstar
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase text-white/60">
          <button
            data-testid="nav-modes"
            onClick={() => scrollToFraction(0.19)}
            className="hover:text-white transition-colors"
          >
            Modes
          </button>
          <button
            data-testid="nav-memory"
            onClick={() => scrollToFraction(0.65)}
            className="hover:text-white transition-colors"
          >
            Memory
          </button>
          <button
            data-testid="nav-manifesto"
            onClick={() => scrollToFraction(0.79)}
            className="hover:text-white transition-colors"
          >
            Manifesto
          </button>
        </nav>
        <button
          data-testid="nav-cta"
          onClick={() => scrollToFraction(1)}
          className="group relative rounded-full px-5 py-2 text-sm font-medium text-white border border-white/15 hover:border-violet-400/60 transition-colors"
        >
          <span className="relative z-10">Start Talking</span>
          <span className="absolute inset-0 rounded-full bg-violet-500/0 group-hover:bg-violet-500/15 transition-colors" />
        </button>
      </div>
    </header>
  );
}

/* ---------- Hero with masked line-by-line reveal ---------- */
const heroLines = [
  "An AI agent",
  "that gets smarter",
  "every time you talk to it.",
];

function Hero() {
  const opacity = useTransform(progressMV, [0, 0.1, 0.14], [1, 1, 0]);
  const y = useTransform(progressMV, [0, 0.14], [0, -70]);
  return (
    <motion.div
      style={{ opacity, y, zIndex: 10 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none px-6"
    >
      <div className="text-center max-w-4xl" data-testid="hero-section">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`${LABEL} mb-6`}
        >
          Meet Northstar — your companion intelligence
        </motion.p>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95]">
          {heroLines.map((line, i) => (
            <span className="mask-line" key={i}>
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.35 + i * 0.14,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 text-base sm:text-lg text-white/60 max-w-xl mx-auto"
        >
          It remembers your conversations, adapts to how you think, and shows
          up differently for every part of your life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase"
        >
          <span>Scroll to wake it up</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Mode panel (holographic icon + asymmetric text) ---------- */
function ModePanel({ mode, pts }) {
  const Icon = mode.icon;
  return (
    <Panel pts={pts} justify="justify-start" className="px-6 sm:px-16">
      <div
        className="max-w-md ml-2 sm:ml-10"
        data-testid={`mode-${mode.id}`}
      >
        <div
          className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-3xl border"
          style={{
            borderColor: `${mode.color}55`,
            background: `radial-gradient(circle at 50% 30%, ${mode.color}33, transparent 70%)`,
            boxShadow: `0 0 40px ${mode.color}55, inset 0 0 20px ${mode.color}33`,
          }}
        >
          <Icon className="w-9 h-9" style={{ color: mode.color }} />
        </div>
        <p className={LABEL} style={{ color: mode.color }}>
          {mode.tag}
        </p>
        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
          {mode.label}
        </h2>
        <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
          {mode.desc}
        </p>
      </div>
    </Panel>
  );
}

/* ---------- Memory section: orbiting fragments ---------- */
const fragments = [
  { t: "“remind me about mom's birthday”", x: "12%", y: "22%", d: 0 },
  { t: "React hooks we debugged", x: "68%", y: "18%", d: 0.6 },
  { t: "your 2am playlist", x: "78%", y: "62%", d: 1.1 },
  { t: "the essay outline", x: "18%", y: "70%", d: 0.3 },
  { t: "“explain it simpler”", x: "45%", y: "12%", d: 0.9 },
  { t: "last week's plan", x: "8%", y: "48%", d: 1.4 },
];

function Memory() {
  return (
    <Panel pts={RANGE.memory} justify="justify-center" className="px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        data-testid="memory-section"
      >
        {fragments.map((f, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs sm:text-sm text-cyan-200/70 whitespace-nowrap"
            style={{
              left: f.x,
              top: f.y,
              textShadow: "0 0 18px rgba(34,211,238,0.5)",
            }}
            animate={{ y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 5 + f.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: f.d,
            }}
          >
            <span className="mr-2 text-violet-400/70">◆</span>
            {f.t}
          </motion.div>
        ))}
      </div>
      <div className="text-center max-w-2xl">
        <p className={`${LABEL} mb-5`}>Persistent Memory</p>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none">
          It{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
            remembers
          </span>{" "}
          — so you don't have to repeat yourself.
        </h2>
        <p className="mt-6 text-base sm:text-lg text-white/60">
          Neural threads connect every past conversation. Northstar recalls
          context across days, projects and moods, weaving your history into
          each new reply.
        </p>
      </div>
    </Panel>
  );
}

/* ---------- Manifesto + marquee ---------- */
const chapters = [
  {
    n: "01",
    t: "Continuity over commands",
    d: "Not a search box you re-explain yourself to. A mind that carries the thread forward.",
  },
  {
    n: "02",
    t: "Presence over features",
    d: "It changes its whole demeanour for study, code, or a quiet late-night talk.",
  },
  {
    n: "03",
    t: "Growth over static answers",
    d: "Every exchange sharpens it. The more you talk, the more it becomes yours.",
  },
];

function Manifesto() {
  return (
    <Panel pts={RANGE.manifesto} justify="justify-center" className="px-6">
      <div className="w-full max-w-5xl" data-testid="manifesto-section">
        <p className={`${LABEL} mb-10`}>The Northstar Manifesto</p>
        <div className="grid md:grid-cols-3 gap-10">
          {chapters.map((c) => (
            <div key={c.n} className="border-t border-white/15 pt-5">
              <span className="font-mono text-sm text-violet-400">{c.n}</span>
              <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight">
                {c.t}
              </h3>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">
                {c.d}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 border-y border-white/10 py-4">
          <Marquee speed={40} gradient={false} autoFill>
            <span className="font-mono text-sm tracking-[0.3em] uppercase text-white/30 mx-8">
              Northstar — always learning
            </span>
            <span className="font-mono text-sm tracking-[0.3em] uppercase text-violet-400/40 mx-8">
              ✦
            </span>
          </Marquee>
        </div>
      </div>
    </Panel>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <Panel pts={RANGE.cta} justify="justify-center" className="px-6">
      <div className="text-center" data-testid="cta-section">
        <p className={`${LABEL} mb-6`}>Ready when you are</p>
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-10">
          Let's start
          <br />
          <span className="text-glow-violet">talking.</span>
        </h2>
        <button
          data-testid="start-talking-btn"
          onClick={() => scrollToFraction(0)}
          className="btn-pulse pointer-events-auto group relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold text-white overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, #8b5cf6, #22d3ee 60%, #ec4899)",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <MessageCircle className="w-5 h-5" />
            Start Talking
          </span>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/15" />
        </button>
        <p className="mt-8 font-mono text-xs tracking-widest uppercase text-white/40 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> No signup to say hi
        </p>
      </div>
    </Panel>
  );
}

/* ---------- Scroll progress rail ---------- */
function ProgressRail() {
  const scaleY = useTransform(progressMV, [0, 1], [0, 1]);
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 h-40 w-[2px] bg-white/10 rounded-full overflow-hidden hidden sm:block">
      <motion.div
        className="w-full bg-gradient-to-b from-violet-400 to-cyan-300 origin-top"
        style={{ height: "100%", scaleY }}
      />
    </div>
  );
}

export default function Landing() {
  useLenis();
  return (
    <div className="App" data-testid="landing-page">
      <div className="aurora" />
      <Experience />
      <div className="grain" />

      <Nav />
      <ProgressRail />

      {/* fixed cross-fading overlays */}
      <Hero />
      <ModePanel mode={MODES[0]} pts={RANGE.study} />
      <ModePanel mode={MODES[1]} pts={RANGE.code} />
      <ModePanel mode={MODES[2]} pts={RANGE.latenight} />
      <ModePanel mode={MODES[3]} pts={RANGE.general} />
      <Memory />
      <Manifesto />
      <CTA />

      {/* tall scroll driver */}
      <div style={{ height: "900vh" }} aria-hidden />
    </div>
  );
}
