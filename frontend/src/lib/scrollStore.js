import { motionValue } from "framer-motion";

// Shared scroll progress (0..1).
// scrollState.progress -> read by the 3D scene every frame (useFrame).
// progressMV -> MotionValue consumed by DOM overlays (useTransform),
// guaranteeing DOM sections and the 3D scene stay perfectly in sync.
export const scrollState = { progress: 0 };
export const progressMV = motionValue(0);
export const lenisRef = { current: null };

export function scrollToFraction(f) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const target = max * f;
  if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 1.6 });
  else window.scrollTo({ top: target, behavior: "smooth" });
}
