import { skills } from "../data";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

// skill name (lowercase, matched by prefix) → devicon path. `dark` icons get inverted on the dark theme.
const ICONS = [
  ["javascript", "javascript/javascript-original"],
  ["typescript", "typescript/typescript-original"],
  ["c++", "cplusplus/cplusplus-original"],
  ["java", "java/java-original"],
  ["python", "python/python-original"],
  ["sql", "azuresqldatabase/azuresqldatabase-original"],
  ["c", "c/c-original", { exact: true }],
  ["react", "react/react-original"],
  ["html", "html5/html5-original"],
  ["css", "css3/css3-original", { exact: true }],
  ["tailwind", "tailwindcss/tailwindcss-original"],
  ["vite", "vitejs/vitejs-original"],
  ["node", "nodejs/nodejs-original"],
  ["express", "express/express-original", { dark: true }],
  ["postgres", "postgresql/postgresql-original"],
  ["mongo", "mongodb/mongodb-original"],
  ["mysql", "mysql/mysql-original"],
  ["aws", "amazonwebservices/amazonwebservices-plain-wordmark", { dark: true }],
  ["github", "github/github-original", { dark: true }],
  ["git", "git/git-original"],
  ["ci/cd", "githubactions/githubactions-original"],
  ["docker", "docker/docker-original"],
  ["playwright", "playwright/playwright-original"],
  ["postman", "postman/postman-original"],
];

function iconFor(name) {
  const n = name.toLowerCase();
  const hit = ICONS.find(([key, , opt]) => (opt?.exact ? n === key : n.startsWith(key)));
  return hit ? { src: `${CDN}/${hit[1]}.svg`, dark: !!hit[2]?.dark } : null;
}

const CATEGORY = {
  Languages: { icon: "⌨️", color: "#f59e0b" },
  Web: { icon: "🌐", color: "#22d3ee" },
  Frontend: { icon: "🎨", color: "#22d3ee" },
  Backend: { icon: "⚙️", color: "#8b5cf6" },
  "Databases & Cloud": { icon: "☁️", color: "#3b82f6" },
  Tools: { icon: "🛠️", color: "#4ade80" },
  "AI / ML": { icon: "🤖", color: "#f472b6" },
  Fundamentals: { icon: "📚", color: "#fb923c" },
};

export default function SkillRows() {
  return (
    <div className="skill-rows glass reveal">
      {Object.entries(skills).map(([cat, list]) => {
        const meta = CATEGORY[cat] || { icon: "✦", color: "#8b5cf6" };
        return (
          <div key={cat} className="skill-row" style={{ "--c": meta.color }}>
            <div className="skill-row-label">
              <span className="skill-row-icon">{meta.icon}</span>
              <div>
                <h3>{cat}</h3>
                <span className="mono">{list.length} skills</span>
              </div>
            </div>
            <div className="skill-row-items">
              {list.map((s) => {
                const ic = iconFor(s);
                return (
                  <span key={s} className="skill-tile">
                    {ic ? (
                      <img src={ic.src} alt="" loading="lazy" className={ic.dark ? "invert" : ""} />
                    ) : (
                      <span className="skill-tile-dot" />
                    )}
                    {s}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
