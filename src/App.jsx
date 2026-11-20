import { lazy, Suspense, useEffect, useState } from "react";
import {
  profile,
  experience,
  projects,
  codingProfiles,
  achievements,
  education,
} from "./data";
import { useReveal } from "./hooks/useReveal";
import { useTypewriter } from "./hooks/useTypewriter";
import { useCountUp } from "./hooks/useCountUp";
import { useInView } from "./hooks/useInView";
import ProfileCard from "./components/ProfileCard";
import SideRail from "./components/SideRail";
import SkillRows from "./components/SkillRows";

// three.js scene is code-split so text paints first
const StatsScene = lazy(() => import("./components/StatsScene"));

const LINKS = ["about", "experience", "projects", "skills", "stats", "contact"];

/* ---------- small helpers ---------- */
function Counter({ value, prefix = "", suffix = "" }) {
  const [ref, n] = useCountUp(value);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function Head({ i, title, sub }) {
  return (
    <div className="head reveal">
      <span className="mono head-i">{i} /</span>
      <h2>{title}</h2>
      {sub && <p className="muted">{sub}</p>}
    </div>
  );
}

// Tilts any card toward the cursor; children with data-depth float above it.
function tilt(strength = 10) {
  return {
    onMouseMove: (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${(0.5 - y) * strength}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * strength}deg`);
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.setProperty("--rx", "0deg");
      e.currentTarget.style.setProperty("--ry", "0deg");
    },
  };
}

/* ---------- Nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(
      (id) =>
        document.getElementById(id) && io.observe(document.getElementById(id)),
    );
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#contact" className="badge nav-badge">
          <span className="pulse" />
          <span>
            Available for <b>SDE / Frontend / Backend</b> roles
          </span>
        </a>
        <nav className={`links ${open ? "open" : ""}`}>
          {LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {id}
            </a>
          ))}
        </nav>
        <button
          className="menu"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const role = useTypewriter(profile.roles);
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            <span className="hi">Hi, I'm</span>
            <span className="name grad">{profile.name}</span>
          </h1>
          <p className="role mono">
            &gt; {role}
            <span className="caret" />
          </p>
          <p className="tagline">{profile.tagline}</p>
          <div className="socials">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="social github"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social linkedin"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a href={`mailto:${profile.email}`} className="social email-link">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <span>Email</span>
            </a>
          </div>
          <div className="ctas">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
            >
              Resume ↗
            </a>
          </div>
        </div>
        <ProfileCard />
      </div>
      <div className="scroll-cue mono">scroll ↓</div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const facts = [
    { v: 8.1, s: "", l: "CGPA at NIT Patna", dec: true },
    { v: 1000, s: "+", l: "DSA problems solved" },
    { v: 2, s: "", l: "live full-stack products" },
    { v: 1, s: "", l: "npm package published" },
  ];
  return (
    <section id="about" className="section">
      <div className="wrap">
        <Head i="01" title="About me" />
        <div className="about">
          <div className="about-text reveal">
            <p>
              Final-year <b>{education.degree}</b> student at <b>NIT Patna</b>{" "}
              and ex-SDE Intern at <b>Rocketium</b>. I love building fast,
              reliable backends with <b>Node.js</b>, <b>TypeScript</b> and{" "}
              <b>AWS</b> — and solving problems on LeetCode (rating <b>1938</b>
              ).
            </p>
          </div>
          <div className="facts">
            {facts.map((f) => (
              <div key={f.l} className="fact glass reveal" {...tilt(14)}>
                <span className="fact-v grad">
                  {f.dec ? f.v : <Counter value={f.v} suffix={f.s} />}
                </span>
                <span className="muted">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Head i="02" title="Experience" sub="Production code, shipped." />
        {experience.map((e) => (
          <article
            key={e.company}
            className="exp glass depth reveal"
            {...tilt(4)}
          >
            <div className="exp-top" data-depth>
              <span className="exp-logo">{e.company[0]}</span>
              <div className="exp-title">
                <h3>
                  {e.role} <span className="grad">@ {e.company}</span>
                </h3>
                <p className="muted exp-co">{e.mode}</p>
              </div>
              <span className="pill mono">{e.period}</span>
            </div>
            <ul className="ticks">
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="tags">
              {e.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function Cube({ label, color }) {
  return (
    <div className="cube-scene" style={{ "--c": color }} aria-hidden="true">
      <div className="cube">
        {["front", "back", "right", "left", "top", "bottom"].map((f) => (
          <span key={f} className={`face ${f}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <article
      className="project glass depth reveal"
      style={{ "--c": p.accent }}
      {...tilt(8)}
    >
      <div className="project-top" data-depth>
        <Cube label={p.name.slice(0, 2)} color={p.accent} />
        <div className="project-title">
          <h3>{p.name}</h3>
          <p className="project-sub">{p.subtitle}</p>
        </div>
        <div className="project-links">
          {p.github && (
            <a
              className="icon-link"
              href={p.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} source code on GitHub`}
              title="Source code"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
              </svg>
              <span>Code</span>
            </a>
          )}
          {p.live && (
            <a
              className="icon-link live"
              href={p.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} live demo`}
              title="Live demo"
            >
              <span className="live-dot" />
              <span>Live</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
      {p.image && (
        <a
          className="preview"
          href={p.live || p.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${p.name}`}
        >
          <div className="preview-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="preview-url mono">
              {(p.live || "")
                .replace(/^https?:\/\/(www\.)?/, "")
                .replace(/\/$/, "")}
            </span>
          </div>
          <div className="preview-shot">
            <img src={p.image} alt={`${p.name} home page`} loading="lazy" />
            <span className="preview-cta">Open live site ↗</span>
          </div>
        </a>
      )}
      <p className="muted" data-depth>
        {p.description}
      </p>
      <ul className="ticks">
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="tags">
        {p.stack.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Head
          i="03"
          title="Projects"
          sub="Live, deployed products — click a preview to try it."
        />
        <div className="projects">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Head
          i="04"
          title="Skills"
          sub="The tools and technologies I work with."
        />
        <SkillRows />
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const [ref, inView] = useInView();
  return (
    <section id="stats" className="section">
      <div className="wrap">
        <Head
          i="05"
          title="Competitive programming"
          sub="Ratings — drag to orbit, hover a bar, click to open the profile."
        />
        <div className="stats">
          <div ref={ref} className="stats-canvas glass reveal">
            {inView && (
              <Suspense
                fallback={<div className="loading mono">loading 3D…</div>}
              >
                <StatsScene />
              </Suspense>
            )}
          </div>
          <div className="stats-side">
            <h3 className="side-title reveal">Profiles</h3>
            <div className="profile-boxes">
              {codingProfiles.map((c) => (
                <a
                  key={c.platform}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="stat glass reveal"
                  style={{ "--c": c.color }}
                  {...tilt(12)}
                >
                  <span className="mono stat-p">{c.platform}</span>
                  <b className="stat-n">
                    <Counter value={c.solved} suffix="+" />
                  </b>
                  <span className="muted">solved · rating {c.rating}</span>
                  <span className="stat-url mono">
                    {c.url
                      .replace(/^https?:\/\/(www\.)?/, "")
                      .replace(/\/$/, "")}{" "}
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <h3 className="side-title reveal">Achievements</h3>
            <ul className="achieve-list reveal">
              {achievements.map((a) => (
                <li key={a.text}>
                  <span className="achieve-icon">🏆</span>
                  <span>
                    Global rank <b>#{a.rank}</b> —{" "}
                    {a.text.replace(/^Global rank in (a )?/i, "")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  const send = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${form.name}`)}&body=${encodeURIComponent(form.message)}`;
  };
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Head
          i="06"
          title="Let's build something"
          sub="Open to SDE / Backend roles — my inbox is always open."
        />
        <div className="contact">
          <div className="glass contact-card reveal" {...tilt(6)}>
            <img src={profile.photo} alt="" className="contact-avatar" />
            <h3>{profile.name}</h3>
            <p className="muted">{profile.title}</p>
            <div className={`email ${copied ? "copied" : ""}`}>
              <a href={`mailto:${profile.email}`} className="email-addr">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                <span>{profile.email}</span>
              </a>
              <button
                type="button"
                className="email-copy"
                onClick={copy}
                aria-label="Copy email address"
              >
                {copied ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="12" height="12" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </svg>
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="row">
              <a
                className="btn ghost small"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="btn ghost small"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a
                className="btn ghost small"
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
              >
                Resume ↗
              </a>
            </div>
          </div>
          <form className="glass contact-form reveal" onSubmit={send}>
            <label>
              Your name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane from Acme"
              />
            </label>
            <label>
              Message
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="We'd love to talk about a role…"
              />
            </label>
            <button className="btn primary" type="submit">
              Send message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div className="glow" aria-hidden="true" />
      <Nav />
      <SideRail />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Stats />
        <Contact />
      </main>
      <footer className="footer wrap mono">
        <span>
          Built with React + Three.js by {profile.name} ·{" "}
          {new Date().getFullYear()}
        </span>
        <a href="#top">back to top ↑</a>
      </footer>
    </>
  );
}
