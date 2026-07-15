import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollStore";
import { washColor } from "../lib/constants";

const MODE_FACE = [-0.7, 0.7, -0.45, 0.0];
const MODE_TILT = [0.06, -0.06, 0.09, 0.0];
const tmp = new THREE.Color();

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(0.7, "rgba(255,255,255,0.08)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

export default function Robot() {
  const g = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const core = useRef();
  const ant = useRef();
  const halo = useRef();
  const glowTex = useMemo(() => makeGlowTexture(), []);

  useFrame((state, delta) => {
    const grp = g.current;
    if (!grp) return;
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;
    const d = Math.min(delta, 0.05);

    // idle bob
    const bob = Math.sin(t * 1.3) * 0.12;
    grp.position.y = THREE.MathUtils.damp(grp.position.y, bob, 6, d);

    // pose targets by scroll section
    let rotY;
    let rotZ = Math.sin(t * 0.8) * 0.03;
    let scl = 1;
    if (p < 0.14) {
      rotY = Math.sin(t * 0.35) * 0.4;
    } else if (p < 0.58) {
      const mi = Math.min(3, Math.max(0, Math.floor((p - 0.14) / 0.11)));
      rotY = MODE_FACE[mi] + Math.sin(t * 0.6) * 0.08;
      rotZ += MODE_TILT[mi];
    } else if (p < 0.83) {
      rotY = Math.sin(t * 0.4) * 0.16;
    } else {
      rotY = 0;
      scl = 1.08;
    }
    grp.rotation.y = THREE.MathUtils.damp(grp.rotation.y, rotY, 4, d);
    grp.rotation.z = THREE.MathUtils.damp(grp.rotation.z, rotZ, 4, d);
    const s = THREE.MathUtils.damp(grp.scale.x, scl, 4, d);
    grp.scale.setScalar(s);

    // glow color follows section
    tmp.set(washColor(p));

    // eyes pulse (cyan constant, glowing)
    const eyePulse = 2.4 + Math.sin(t * 3.2) * 0.9;
    if (eyeL.current) eyeL.current.emissiveIntensity = eyePulse;
    if (eyeR.current) eyeR.current.emissiveIntensity = eyePulse;

    // chest core: intensifies during Memory section, tinted to section
    const inMemory = p > 0.58 && p < 0.83 ? 1 : 0;
    const coreTarget = 1.4 + inMemory * 3.2 + Math.sin(t * 2) * (0.4 + inMemory);
    if (core.current) {
      core.current.emissiveIntensity = THREE.MathUtils.damp(
        core.current.emissiveIntensity,
        coreTarget,
        5,
        d,
      );
      core.current.emissive.lerp(tmp, 1 - Math.pow(0.0001, d));
    }
    if (halo.current) {
      halo.current.color.lerp(tmp, 1 - Math.pow(0.0001, d));
      halo.current.opacity = THREE.MathUtils.damp(
        halo.current.opacity,
        0.55 + inMemory * 0.35,
        4,
        d,
      );
    }
    if (ant.current) {
      ant.current.emissiveIntensity = 1.6 + Math.sin(t * 4) * 0.7;
      ant.current.emissive.lerp(tmp, 1 - Math.pow(0.0001, d));
    }
  });

  const dark = { color: "#14141f", metalness: 0.55, roughness: 0.35 };
  const light = { color: "#2a2a3d", metalness: 0.4, roughness: 0.45 };

  return (
    <group ref={g} position={[0, 0, 0]}>
      {/* soft rim glow behind robot */}
      <mesh position={[0, 0.1, -1.2]} scale={5.6}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          ref={halo}
          map={glowTex}
          color="#8b5cf6"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* head */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <sphereGeometry args={[0.64, 64, 64]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      {/* visor */}
      <mesh position={[0, 0.62, 0.42]} rotation={[0.05, 0, 0]}>
        <sphereGeometry
          args={[0.5, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.62]}
        />
        <meshStandardMaterial
          color="#0b0b14"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      {/* eyes */}
      <mesh position={[-0.19, 0.66, 0.62]}>
        <sphereGeometry args={[0.085, 32, 32]} />
        <meshStandardMaterial
          ref={eyeL}
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.19, 0.66, 0.62]}>
        <sphereGeometry args={[0.085, 32, 32]} />
        <meshStandardMaterial
          ref={eyeR}
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>

      {/* antenna */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.34, 16]} />
        <meshStandardMaterial {...light} />
      </mesh>
      <mesh position={[0, 1.48, 0]}>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshStandardMaterial
          ref={ant}
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>

      {/* neck */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.18, 24]} />
        <meshStandardMaterial {...light} />
      </mesh>

      {/* body */}
      <mesh position={[0, -0.42, 0]}>
        <capsuleGeometry args={[0.52, 0.7, 24, 48]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      {/* chest core */}
      <mesh position={[0, -0.28, 0.44]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          ref={core}
          color="#0b0b14"
          emissive="#a855f7"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      {/* chest ring */}
      <mesh position={[0, -0.28, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.02, 16, 48]} />
        <meshStandardMaterial
          color="#2a2a3d"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* arms */}
      <mesh position={[-0.66, -0.32, 0]} rotation={[0, 0, 0.35]}>
        <capsuleGeometry args={[0.12, 0.42, 16, 32]} />
        <meshStandardMaterial {...light} />
      </mesh>
      <mesh position={[0.66, -0.32, 0]} rotation={[0, 0, -0.35]}>
        <capsuleGeometry args={[0.12, 0.42, 16, 32]} />
        <meshStandardMaterial {...light} />
      </mesh>
      {/* hands */}
      <mesh position={[-0.83, -0.62, 0]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial {...dark} />
      </mesh>
      <mesh position={[0.83, -0.62, 0]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial {...dark} />
      </mesh>

      {/* ear pods */}
      <mesh position={[-0.64, 0.62, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.64, 0.62, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
