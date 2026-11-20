import { useRef, useState } from "react";
import { profile, education, codingProfiles, experience } from "../data";

// 3D holographic ID card: tilts toward the cursor, click to flip.
export default function ProfileCard() {
  const ref = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 22}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 22}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const onLeave = () => {
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };

  const lc = codingProfiles[0];

  return (
    <div className="pcard-stage" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={ref}
        className={`pcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label="Profile card, click to flip"
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)
        }
      >
        {/* Front */}
        <div className="pcard-face pcard-front">
          <img src={profile.photo} alt={profile.name} draggable="false" />
          <div className="pcard-shade" />
          <div className="pcard-glare" />
          <div className="pcard-info">
            <span className="mono pcard-id">ID · RC-2026</span>
            <h3>{profile.name}</h3>
            <p>{profile.title}</p>
          </div>
        </div>

        {/* Back */}
        <div className="pcard-face pcard-back">
          <span className="mono pcard-id">// quick facts</span>
          <ul>
            <li>
              <b>🎓</b> {education.degree},{" "}
              {education.school.replace(
                "National Institute of Technology",
                "NIT",
              )}
            </li>
            <li>
              <b>💼</b> SDE Intern @ {experience[0].company}
            </li>
            <li>
              <b>⚡</b> {lc.solved}+ LeetCode problems · {lc.rating} rating
            </li>
            <li>
              <b>🛠</b> Node.js · TypeScript · React · Javascript · PostgreSQL ·
              AWS
            </li>
            <li>
              <b>📍</b> {profile.location}
            </li>
          </ul>
          <a
            className="btn primary small"
            href="#contact"
            onClick={(e) => e.stopPropagation()}
          >
            Get in touch →
          </a>
        </div>

        {/* Floating badges, pushed toward the viewer in 3D */}
        <span className="float-badge b1">🏆 LeetCode {lc.rating}</span>
        <span className="float-badge b2">⚙️ Backend · MERN</span>
        <span className="float-badge b3">☁️ AWS</span>
      </div>
      <button
        type="button"
        className={`pcard-hint mono ${flipped ? "seen" : ""}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <span className="hint-icon">↻</span>
        {flipped ? "Click to flip back" : "Click the card to flip"}
      </button>
    </div>
  );
}
