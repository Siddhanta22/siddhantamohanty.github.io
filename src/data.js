import { Brain, Film, Zap, Mail, Mic, Rewind, Compass } from 'lucide-react';

// Single source of truth for the Projects and Experience sections, and for the
// skill -> evidence links in Skills.
export const projects = [
  {
    id: 1,
    title: "Self-Heal System",
    role: "Personal Project",
    teaser: "Delivers each error to Slack with an explanation and a recommended fix.",
    summary: "Engineers often find errors by digging through logs, working out what went wrong, and deciding how to fix it. Self-Heal automates that first pass. It classifies errors by SQLSTATE, retrieves similar past incidents with FAISS, and uses an LLM to explain the issue and recommend a fix before sending it to Slack with a severity level, so engineers can focus on preventing it next time. Each alert also links to a chatbot with read-only access to recent error logs and live stats.",
    technologies: ["Flask", "LangChain", "FAISS", "RAG", "PostgreSQL", "OpenAI", "Slack"],
    impact: "Testing exposed two failure cases: message-based classification misfiled a lock timeout as a connection problem, and FAISS returned similar incidents even when none were relevant. I switched classification to SQLSTATE codes and added a similarity threshold, so unrelated incidents are filtered out and novel errors fall back to the model's own knowledge.",
    github: "https://github.com/Siddhanta22/Self-Healing-System",
    live: null,
    icon: Brain,
    screenshots: ["/self-healing-workflow.jpg", "/self-healing-dashboard.jpg", "/self-healing-errors.jpg"]
  },
  {
    id: 10,
    title: "Rewind",
    role: "Personal Project",
    teaser: "Replays agent workflows with zero LLM calls, 32x faster on the demo.",
    summary: "An LLM-driven browser agent built on Claude tool-calling and Playwright that completes multi-step workflows on a demo banking app from accessibility-tree snapshots, then compiles successful runs into typed, versioned replay artifacts.",
    technologies: ["Python", "Playwright", "Pydantic", "Claude API", "MCP"],
    impact: "The deterministic replay engine reruns recorded workflows with zero LLM calls — 0.41s versus 13.1s with an LLM in the loop, a 32x speedup — and is exposed to AI agents through an MCP server with action allowlisting, approval gating, and secret redaction.",
    github: "https://github.com/Siddhanta22/Rewind",
    live: null,
    icon: Rewind,
  },
  {
    id: 11,
    title: "Scout",
    role: "Personal Project",
    teaser: "Finds and ranks nonprofits for student consulting clubs from public IRS 990 data.",
    summary: "A prospecting tool for student consulting groups: search the public IRS Form 990 dataset through ProPublica's Nonprofit Explorer API, shortlist organizations, and track outreach status and notes. Each prospect gets a transparent 0–100 fit score built from revenue band, cause area, and revenue trend, with the reasons shown.",
    technologies: ["TypeScript", "Express", "Prisma", "SQLite", "Vitest"],
    impact: "Caches filings with a TTL and serves stale data if the upstream API fails, throttles and retries requests to ProPublica, and ships with 49 tests covering the cache, the API client, and the endpoints.",
    github: "https://github.com/Siddhanta22/Scout",
    live: null,
    icon: Compass,
  },
  {
    id: 6,
    title: "Prompt Tracer",
    role: "Personal Project",
    teaser: "Scores your prompt as you type it, inside ChatGPT, Claude, Grok, and Gemini.",
    summary: "A Chrome extension that grades prompts in real time against five plain-language checks (detail, clear action, specifics, audience, structure) and shows live feedback in a floating panel on ChatGPT, Claude, Grok, and Gemini.",
    technologies: ["JavaScript", "Chrome Extension API", "Manifest V3"],
    impact: "A privacy-first optimizer appends only what a prompt is missing, rule-based by default with optional OpenAI rewriting, and a dashboard charts score trends and platform usage. Everything runs in the browser.",
    github: "https://github.com/Siddhanta22/prompt_tracer",
    live: null,
    icon: Zap,
    screenshots: ["/prompt-tracer-1.jpg", "/prompt-tracer-2.jpg"]
  },
  {
    id: 2,
    title: "yourAIbrief",
    role: "Personal Project",
    teaser: "A personalized AI newsletter platform with magic-link auth and 50+ sources.",
    summary: "A full-stack AI newsletter platform with magic-link authentication and personalized topic preferences. Aggregates content from 50+ trusted sources and delivers structured briefs on a per-user schedule.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Resend", "Vercel"],
    impact: "Tracks per-issue email open and click analytics to measure real engagement, not just delivery.",
    github: "https://github.com/Siddhanta22/yourAIbrief",
    live: "https://your-a-ibrief.vercel.app",
    icon: Mail,
  },
  {
    id: 9,
    title: "Swipeflix",
    role: "Personal Project",
    teaser: "Swipe-based movie discovery with a custom weighted-scoring algorithm.",
    summary: "A swipe-based movie and TV discovery app. Recommendations are driven by a weighted scoring algorithm — genre match, popularity, recency, and format — tuned by a 5-question onboarding quiz and live TMDB API data.",
    technologies: ["React", "Vite", "Tailwind CSS", "TMDB API", "Vercel"],
    impact: "Built custom gesture-driven swipe interactions with hand-rolled CSS transforms (no animation libraries), plus session recaps that surface swipe stats and inferred viewing preferences.",
    github: "https://github.com/Siddhanta22/swipeflix",
    live: "https://swipeflix-alpha.vercel.app",
    icon: Film,
    screenshots: ["/swipeflix-1.jpg", "/swipeflix-2.jpg", "/swipeflix-3.jpg"]
  },
  {
    id: 3,
    title: "AI Transcript",
    role: "Personal Project",
    teaser: "Records or uploads audio, transcribes it, and strips the filler words.",
    summary: "Record audio or upload a file, transcribe it with OpenAI Whisper, then clean the transcript with an LLM that removes filler words. A FastAPI backend serves a lightweight browser front end.",
    technologies: ["FastAPI", "OpenAI Whisper", "GPT-4o mini", "JavaScript"],
    impact: "Both models are configurable; the defaults are whisper-1 for transcription and gpt-4o-mini for cleanup.",
    github: "https://github.com/Siddhanta22/AI_transcript",
    live: "https://www.loom.com/share/da220be0a60640dbbbe3ffa6c4182a31",
    icon: Mic,
  },
];

export const experiences = [
  {
    id: 1,
    company: "Penn State University",
    role: "Research Assistant",
    location: "University Park, PA, USA",
    dates: "Sep 2025 – Dec 2025",
    teaser: "Evaluated RL approaches for a two-LLM code pipeline and proposed PPO with a compiler-and-analysis reward framework.",
    achievements: [
      "Evaluated reinforcement learning (RL) approaches to improve code correction in an existing two-LLM pipeline that generates, verifies, and iteratively corrects code using verification feedback",
      "Proposed Proximal Policy Optimization (PPO) and designed a reward framework using GCC compiler diagnostics, KLEE symbolic execution, and CodeQL static analysis results to guide the learning process"
    ],
    technologies: ["Reinforcement Learning", "PPO", "LLMs", "Python", "GCC", "KLEE", "CodeQL"],
    logo: "PSU"
  },
  {
    id: 2,
    company: "HCLTech",
    role: "GenAI Intern — LLM Systems",
    location: "Redmond, WA, USA",
    dates: "May 2025 – Aug 2025",
    teaser: "Built a RAG-based support system that cut resolution time in half.",
    achievements: [
      "Built a RAG-based support automation pipeline that turns production error logs into remediation recommendations and automated Slack alerts, cutting support resolution time 50%",
      "Indexed internal documentation and historical incidents into FAISS with structured metadata, sharpening the relevance of retrieved recommendations",
      "Orchestrated multi-agent workflows across APIs, file systems, databases, and Confluence using MCP and LangChain to automate knowledge retrieval and routine actions"
    ],
    technologies: ["LLMs", "RAG", "Flask", "FAISS", "MCP", "Python", "LangChain"],
    logo: "HCL"
  },
  {
    id: 3,
    company: "Penn State Advanced Vehicle Team",
    role: "Perception Team Member",
    location: "State College, PA, USA",
    dates: "Feb 2025 – Dec 2025",
    teaser: "Curated and validated perception datasets for a competition-grade autonomous vehicle.",
    achievements: [
      "Curated and labeled perception datasets in Roboflow to support object-detection model training for vehicle and traffic scenarios",
      "Ran ROS2 perception pipelines against recorded rosbag sessions to evaluate detection output and catch dataset issues before training",
      "Worked alongside the perception team to turn raw sensor recordings into training-ready data for a competition-grade autonomous vehicle"
    ],
    technologies: ["Python", "ROS2", "Roboflow", "Computer Vision"],
    logo: "AVT"
  },
  {
    id: 4,
    company: "Elevatoz Loyalty",
    role: "Data Analytics Intern",
    location: "Bengaluru, KA, India",
    dates: "Jun 2024 – Aug 2024",
    teaser: "Cleaned and analyzed structured customer datasets to surface behavioral trends.",
    achievements: [
      "Cleaned, transformed, and analyzed structured customer datasets using SQL and Python (pandas, NumPy)"
    ],
    technologies: ["SQL", "Python", "pandas", "NumPy"],
    logo: "EL"
  }
];
