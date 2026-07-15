import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import Robot from "./Robot";
import { scrollState } from "../lib/scrollStore";
import { washColor } from "../lib/constants";

const camTarget = new THREE.Vector3();
const washCol = new THREE.Color();
const rimCol = new THREE.Color();

function Rig() {
  const wash = useRef();
  const rim = useRef();
  const stars = useRef();

  useFrame((state, delta) => {
    const p = scrollState.progress;
    const d = Math.min(delta, 0.05);
    const cam = state.camera;

    // camera targets per section
    let cz = 6.2;
    let cx = 0;
    let cy = 0.25;
    if (p < 0.14) {
      cz = 6.2;
      cy = 0.25;
    } else if (p < 0.58) {
      const mi = Math.min(3, Math.max(0, Math.floor((p - 0.14) / 0.11)));
      cz = 4.9;
      cx = [-0.4, 0.4, -0.3, 0][mi];
      cy = 0.18;
    } else if (p < 0.83) {
      cz = 5.4;
      cy = 0.1;
    } else {
      cz = 7.4;
      cy = 0.55;
    }
    camTarget.set(cx, cy, cz);
    cam.position.lerp(camTarget, 1 - Math.pow(0.0015, d));
    cam.lookAt(0, 0, 0);

    // light wash
    washCol.set(washColor(p));
    rimCol.set(washColor(p));
    if (wash.current)
      wash.current.color.lerp(washCol, 1 - Math.pow(0.0006, d));
    if (rim.current) rim.current.color.lerp(rimCol, 1 - Math.pow(0.0006, d));

    // slow starfield drift
    if (stars.current) {
      stars.current.rotation.y += d * 0.02;
      stars.current.rotation.x += d * 0.005;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[2, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight
        ref={wash}
        position={[0, 0.5, 3]}
        intensity={22}
        distance={12}
        color="#8b5cf6"
      />
      <pointLight
        ref={rim}
        position={[-3, 1, -3]}
        intensity={30}
        distance={14}
        color="#22d3ee"
      />
      <pointLight
        position={[3, -1, -2]}
        intensity={14}
        distance={12}
        color="#ec4899"
      />
      <group ref={stars}>
        <Stars radius={70} depth={40} count={4200} factor={4} fade speed={1} />
      </group>
    </>
  );
}

export default function Scene() {
  return (
    <>
      <Rig />
      <Robot />
    </>
  );
}
