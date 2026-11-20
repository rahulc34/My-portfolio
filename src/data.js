// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: "Rahul Chaurasiya",
  shortName: "Rahul",
  title: "Backend / Software Development Engineer",
  roles: [
    "Backend Engineer",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "Competitive Programmer",
  ],
  tagline:
    "I design RESTful APIs and build full-stack applications that ship to production — from CI tooling and real-time pipelines to sandboxed code execution.",
  location: "Uttar Pradesh, India",
  email: "rahul.connectt@gmail.com",
  linkedin: "https://www.linkedin.com/in/rahul-chaurasiya-42a971326/",
  github: "https://github.com/rahulc34",
  resume: "https://drive.google.com/file/d/1zK-NldgKGxIvgVQMIBpHFHdD7y-dC9n_/view?usp=sharing",
  photo: `${import.meta.env.BASE_URL}profile.webp`,
};

export const education = {
  school: "National Institute of Technology, Patna",
  degree: "B.Tech in Electrical Engineering",
  cgpa: "8.1 / 10",
  period: "2022 – 2026",
  location: "Patna, India",
};

export const experience = [
  {
    role: "SWE Intern",
    company: "Rocketium",
    period: "Jan 2026 – Jun 2026",
    mode: "Hybrid",
    // Short points shown on the site
    highlights: [
      "Wrote the HLD and built a self-hosted Playwright test-reporting platform, replacing a $100/mo SaaS tool.",
      "Built a TypeScript Playwright reporter, published on npm, that streams CI test results to the backend in real time.",
      "Deployed on AWS: EC2 backend, PostgreSQL on RDS, artifacts in S3, frontend on S3 + CloudFront.",
      "Built a GitHub Actions workflow to run selected test suites on demand instead of the 30–40 min full suite.",
      "Integrated Slack notifications for 4 user activities and PostHog analytics across the frontend.",
      "Resolved 50+ UI bugs across production Node.js/TypeScript repositories.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Playwright",
      "GitHub Actions",
      "Slack API",
      "PostHog",
      "npm",
    ],
  },
];

export const projects = [
  {
    name: "CloudIDE",
    subtitle: "Full-Stack Online Code Editor",
    description:
      "An online coding platform with Monaco Editor and sandboxed execution for C++, Java, Python, JavaScript and TypeScript.",
    features: [
      "Monaco Editor with syntax highlighting and multi-language execution (C++, Java, Python, JS, TS).",
      "RESTful APIs in Node.js, Express and TypeScript with MongoDB for persistence and sessions.",
      "Asynchronous execution with Redis + BullMQ, processing jobs through dedicated workers.",
      "Docker-based sandboxing with resource limits and process isolation for untrusted code.",
      "Frontend on Firebase Hosting, backend on Google Cloud, Google OAuth and a custom domain.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Docker",
      "GCP",
      "Nginx",
      "CI/CD",
    ],
    live: "https://www.cloudide.in/",
    image: `${import.meta.env.BASE_URL}projects/cloudide.png`,
    github: "https://github.com/rahulc34/online-compiler-backend",
    accent: "#22c55e",
  },
  {
    name: "PlayBox",
    subtitle: "Full-Stack Video Streaming Platform",
    description:
      "A production-ready video platform: upload, watch, like/dislike, threaded comments, playlists and subscriptions.",
    features: [
      "RESTful API in Node.js/Express with a responsive React dashboard (React Router, Context API, dark mode).",
      "Secure auth with JWT access/refresh tokens in HTTP-only cookies, email verification and password reset via Nodemailer.",
      "Cloudinary + Multer for video/image upload and streaming, offloading media storage from the server.",
      "Feeds, search and filters optimized with MongoDB aggregation pipelines and pagination.",
      "Full stack deployed on Render backed by MongoDB Atlas.",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Tailwind CSS",
    ],
    live: "https://playbox-ontf.onrender.com/",
    image: `${import.meta.env.BASE_URL}projects/playbox.png`,
    github: "https://github.com/rahulc34/PlayBox",
    accent: "#f97316",
  },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "C++", "Java", "Python", "C", "SQL"],
  Web: [
    "React.js",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Vite",
    "Node.js",
    "Express.js",
    "REST APIs",
  ],
  "Databases & Cloud": [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "AWS (S3, EC2, RDS, CloudFront, Lambda)",
    "GCP",
    "Firebase",
  ],
  Tools: [
    "Git",
    "GitHub Actions",
    "Docker",
    "Nginx",
    "Linux",
    "Playwright",
    "Postman",
  ],
  Fundamentals: [
    "DSA",
    "OOP",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "System Design",
  ],
};

export const codingProfiles = [
  {
    platform: "LeetCode",
    solved: 900,
    rating: 1938,
    color: "#f59e0b",
    url: "https://leetcode.com/u/skullnight/",
  },
  {
    platform: "CodeChef",
    solved: 70,
    rating: 1575,
    color: "#a16207",
    url: "https://www.codechef.com/users/guts_b",
  },
  {
    platform: "Codeforces",
    solved: 110,
    rating: 1257,
    color: "#3b82f6",
    url: "https://codeforces.com/profile/rc17",
  },
];

export const achievements = [
  { rank: 720, text: "Global rank in LeetCode Weekly Contest 492" },
  { rank: 550, text: "Global rank in CodeChef Starters 124" },
];
