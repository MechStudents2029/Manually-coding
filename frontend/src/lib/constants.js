import { BookOpen, TerminalSquare, Moon, Orbit } from "lucide-react";

// Scroll ranges (fractions of total page scroll) kept in sync between
// the DOM overlays (framer-motion) and the 3D scene (useFrame).
export const RANGE = {
  hero: [0, 0.02, 0.1, 0.14],
  study: [0.14, 0.17, 0.23, 0.26],
  code: [0.25, 0.28, 0.34, 0.37],
  latenight: [0.36, 0.39, 0.45, 0.48],
  general: [0.47, 0.5, 0.55, 0.58],
  memory: [0.58, 0.62, 0.7, 0.74],
  manifesto: [0.73, 0.77, 0.81, 0.85],
  cta: [0.84, 0.9, 1, 1.2],
};

export const MODES = [
  {
    id: "study",
    tag: "01 / Focus",
    label: "Study Mode",
    icon: BookOpen,
    color: "#38bdf8",
    desc: "Turns dense material into clear, patient explanations — quizzing you, tracking gaps, and pacing to how you actually learn.",
  },
  {
    id: "code",
    tag: "02 / Build",
    label: "Code Mode",
    icon: TerminalSquare,
    color: "#22c55e",
    desc: "A pair-programmer that reads your stack, reasons through bugs out loud, and ships snippets that fit your codebase.",
  },
  {
    id: "latenight",
    tag: "03 / Unwind",
    label: "Late Night Talk",
    icon: Moon,
    color: "#a78bfa",
    desc: "When it's quiet and the thoughts get loud — a calm voice to think alongside, no judgement, no rush.",
  },
  {
    id: "general",
    tag: "04 / Everything",
    label: "General Mode",
    icon: Orbit,
    color: "#e5e7eb",
    desc: "The everyday companion that plans, drafts, searches and remembers — fluidly switching context as you do.",
  },
];

// Mode / section light wash color used by the robot + light rig.
export function washColor(p) {
  if (p < 0.14) return "#8b5cf6";
  if (p < 0.25) return "#38bdf8";
  if (p < 0.36) return "#22c55e";
  if (p < 0.47) return "#a78bfa";
  if (p < 0.58) return "#e5e7eb";
  if (p < 0.83) return "#a855f7";
  return "#ec4899";
}
