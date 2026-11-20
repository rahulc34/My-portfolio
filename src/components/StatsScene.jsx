import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { codingProfiles } from "../data";

const MAX = 2200;
const HEIGHT = 4;

function Bar({ p, x }) {
  const group = useRef();
  const [hover, setHover] = useState(false);
  const target = (p.rating / MAX) * HEIGHT;

  useFrame(() => {
    const g = group.current;
    g.scale.y += (target - g.scale.y) * 0.04; // grow in
  });

  return (
    <group position={[x, 0, 0]}>
      <group ref={group} scale={[1, 0.001, 1]}>
        <RoundedBox
          args={[1.1, 1, 1.1]}
          radius={0.08}
          position={[0, 0.5, 0]}
          onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
          onClick={() => window.open(p.url, "_blank", "noopener")}
        >
          <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={hover ? 0.55 : 0.18} metalness={0.4} roughness={0.3} />
        </RoundedBox>
      </group>
      <Html position={[0, target + 0.7, 0]} center distanceFactor={9} zIndexRange={[10, 0]}>
        <div className={`bar-label ${hover ? "hover" : ""}`} style={{ "--c": p.color }}>
          <b>{p.rating}</b>
          <span>{p.platform}</span>
          {hover && <em>{p.solved}+ solved</em>}
        </div>
      </Html>
    </group>
  );
}

export default function StatsScene() {
  return (
    <Canvas camera={{ position: [4.5, 4, 7.5], fov: 45 }} dpr={[1, 1.75]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} />
      <pointLight position={[-5, 3, -3]} intensity={30} color="#8b5cf6" />
      <group position={[0, -1.6, 0]}>
        {codingProfiles.map((p, i) => (
          <Bar key={p.platform} p={p} x={(i - 1) * 2} />
        ))}
        <gridHelper args={[10, 20, "#8b5cf6", "#1f2233"]} />
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} minPolarAngle={0.6} maxPolarAngle={1.45} />
    </Canvas>
  );
}
