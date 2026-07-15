import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Scene from "./Scene";

export default function Experience() {
  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 1 }}
      data-testid="robot-canvas"
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.25, 6.2], fov: 42 }}
      >
        <Suspense fallback={null}>
          <Scene />
          <EffectComposer disableNormalPass>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.25}
              luminanceSmoothing={0.9}
              mipmapBlur
              radius={0.7}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
