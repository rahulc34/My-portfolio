import { useEffect, useState } from "react";

const ITEMS = [
  { id: "about", label: "About me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "stats", label: "Competitive Programming" },
  { id: "contact", label: "Contact me" },
];

// Fixed vertical progress rail: shows which section you're in and how far
// you've scrolled between sections. Click a dot to jump there.
export default function SideRail() {
  const [active, setActive] = useState(-1);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const probe = window.scrollY + window.innerHeight * 0.4;
      const tops = ITEMS.map((it) => document.getElementById(it.id)?.offsetTop ?? Infinity);
      const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 4;

      let idx = -1;
      tops.forEach((t, i) => probe >= t && (idx = i));
      if (atBottom) idx = ITEMS.length - 1;

      let f = 0;
      if (idx === ITEMS.length - 1) f = 1;
      else if (idx >= 0) {
        const frac = Math.min(1, (probe - tops[idx]) / (tops[idx + 1] - tops[idx]));
        f = (idx + frac) / (ITEMS.length - 1);
      }
      setActive(idx);
      setFill(f);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="rail" aria-label="Section progress">
      <div className="rail-track">
        <div className="rail-fill" style={{ transform: `scaleY(${fill})` }} />
      </div>
      {ITEMS.map((it, i) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={`rail-item ${i === active ? "active" : ""} ${i < active ? "done" : ""}`}
          aria-current={i === active ? "true" : undefined}
        >
          <span className="rail-label">{it.label}</span>
          <span className="rail-dot" />
        </a>
      ))}
    </nav>
  );
}
