"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { VersionFooter } from "@/components/version-footer";
import { Gamepad2, Zap, Trophy, Play, Cpu, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const games = [
  { name: "archive games", url: "https://thebasicss.vercel.app", description: "my own selection of games", category: "Premium", hot: true },
  { name: "babydoll games", url: "https://thebasicsss.vercel.app", description: "monkeygg", category: "Fun", hot: false },
  { name: "supernova", url: "https://sites.google.com/beaufortschools.org/supernova/home", description: "coming soon", category: "School", hot: true },
  { name: "Seraph", url: "https://basicsssss.vercel.app", description: "BEST OF THE BEST", category: "Premium", hot: true },
  { name: "games123", url: "https://notepad-40.a.ssl.fastly.net", description: "Fast-loading mirror with premium game collection", category: "New", hot: false },
  { name: "Geometry Dash", url: "https://basicsssss.vercel.app/games/gdlite/index.html", description: "Fast Geometry Dash in your browser", category: "Classic", hot: true },
  { name: "Lunar", url: "https://lunar-nu.vercel.app", description: "Home of Retro Bowl and classic sports games", category: "Sports", hot: false },
  { name: "ROMS", url: "https://gba.vercel.app", description: "Play classic GBA and retro console games in your browser", category: "Retro", hot: false },
  { name: "Copper", url: "https://clever-schools.vercel.app", description: "Clean interface with hand-picked quality games", category: "Premium", hot: false },
  { name: "Selenite", url: "https://selenite-beta.vercel.app", description: "Huge library with hundreds of titles to explore", category: "Library", hot: false },
  { name: "More-Less", url: "https://the-more-less-game-nuxt.vercel.app", description: "Challenging number guessing game — test your intuition", category: "Indie", hot: false },
  { name: "Minecraft", url: "https://supanoob.vercel.app", description: "Play Minecraft 1.9 directly in your browser", category: "Classic", hot: true },
  { name: "Beansite", url: "https://mb7.vercel.app", description: "Lightweight game portal with fast load times", category: "New", hot: false },
  { name: "???", url: "https://rule34dle.vercel.app", description: "Mystery guessing game with unique gameplay mechanics", category: "Indie", hot: false },
  { name: "Petezah", url: "https://thepetezah.vercel.app", description: "Community favorite with classic and modern games", category: "Classic", hot: false },
  { name: "Strange Rope Police", url: "https://amazing-strange-rope-police.vercel.app", description: "Open-world action combining GTA with superhero powers", category: "Action", hot: true },
  { name: "Vote", url: "https://gameboys.vercel.app/order/new", description: "Support the community — vote for your favorite games", category: "Social", hot: false },
  { name: "GN Math", url: "https://thebasic.vercel.app", description: "Has the best game catalog ever assembled", category: "Premium", hot: true },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const categories = ["All", "Premium", "Classic", "New", "Sports", "Retro", "Indie", "Action"];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [engineStatus, setEngineStatus] = useState<"STABLE" | "UNSTABLE">("STABLE");
  const [showTerms, setShowTerms] = useState(true);
  const [searching, setSearching] = useState(false);
  const [timeUnlocked, setTimeUnlocked] = useState(false);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    setEngineStatus(Math.random() < 0.5 ? "STABLE" : "UNSTABLE");
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev, newClick]);
      setTimeout(() => setClicks((prev) => prev.filter((c) => c.id !== newClick.id)), 600);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  useEffect(() => {
    const checkUnlock = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York", hour12: false, hour: "2-digit", minute: "2-digit",
      }).formatToParts(now);
      const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
      const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
      setTimeUnlocked(hour > 10 || (hour === 10 && minute >= 45));
    };
    checkUnlock();
    const interval = setInterval(checkUnlock, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredGames = games.filter((game) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      game.name.toLowerCase().includes(q) || game.description?.toLowerCase().includes(q);
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');

        .gb-root {
          font-family: 'DM Sans', sans-serif;
          background: #080810;
          color: #f0ede8;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .gb-root::before {
          content: '';
          position: fixed; top: -30%; left: -20%;
          width: 70%; height: 70%;
          background: radial-gradient(ellipse, rgba(100,80,180,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .gb-root::after {
          content: '';
          position: fixed; bottom: -20%; right: -10%;
          width: 60%; height: 60%;
          background: radial-gradient(ellipse, rgba(200,169,110,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* CLICK TRAIL */
        .gb-trail { pointer-events: none; position: fixed; inset: 0; z-index: 5; }

        /* TERMS MODAL */
        .gb-overlay {
          position: fixed; inset: 0; z-index: 50;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.75); backdrop-filter: blur(16px);
        }
        .gb-modal {
          width: 95%; max-width: 500px;
          background: rgba(8,8,16,0.95);
          border: 0.5px solid rgba(200,169,110,0.2);
          border-radius: 24px;
          padding: 2.5rem;
        }
        .gb-modal-eyebrow {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 0.5rem;
        }
        .gb-modal h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900;
          color: #f0ede8; margin-bottom: 1.5rem;
        }
        .gb-modal-body {
          font-size: 13px; line-height: 1.7; color: #7a7a8c;
          max-height: 40vh; overflow-y: auto;
          margin-bottom: 2rem;
        }
        .gb-modal-body strong { color: #c8a96e; display: block; margin-top: 1rem; margin-bottom: 0.25rem; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; }
        .gb-modal-actions { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .gb-enter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #080810;
          background: #c8a96e;
          border: none; border-radius: 100px;
          padding: 10px 28px; cursor: pointer;
          transition: background 0.2s;
        }
        .gb-enter-btn:hover { background: #e8c87e; }
        .gb-modal-hint { font-size: 10px; color: #7a7a8c; }

        /* SCANNING OVERLAY */
        .gb-scan-bar {
          height: 4px; width: 100%;
          background: rgba(255,255,255,0.06);
          border-radius: 100px; overflow: hidden; margin-top: 1rem;
        }

        /* HERO */
        .gb-hero {
          position: relative; z-index: 1;
          padding: 9rem 3rem 4rem;
        }
        .gb-eyebrow {
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 12px;
          animation: gbFadeUp 0.6s ease forwards 0.1s; opacity: 0;
        }
        .gb-eyebrow::before {
          content: ''; display: inline-block;
          width: 32px; height: 1px; background: #c8a96e;
        }
        .gb-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem);
          font-weight: 900; line-height: 0.9; letter-spacing: -0.02em;
          animation: gbFadeUp 0.8s ease forwards 0.25s; opacity: 0;
        }
        .gb-title .solid { color: #f0ede8; }
        .gb-title .outline {
          -webkit-text-stroke: 1px rgba(200,169,110,0.4);
          color: transparent;
        }
        .gb-meta {
          margin-top: 2.5rem;
          display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;
          animation: gbFadeUp 0.6s ease forwards 0.45s; opacity: 0;
        }
        .gb-count {
          font-family: 'DM Mono', monospace;
          font-size: 11px; color: #7a7a8c; letter-spacing: 0.1em;
        }
        .gb-count strong { color: #c8a96e; font-size: 24px; font-weight: 400; margin-right: 4px; vertical-align: middle; }
        .gb-divider { width: 1px; height: 32px; background: rgba(200,169,110,0.3); }
        .gb-engine {
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        }
        .gb-engine-dot {
          width: 8px; height: 8px; border-radius: 50%;
        }
        .gb-engine-dot.stable { background: #6ee7b7; box-shadow: 0 0 8px rgba(110,231,183,0.6); }
        .gb-engine-dot.unstable { background: #f87171; box-shadow: 0 0 8px rgba(248,113,113,0.6); animation: gbPulse 1s infinite; }
        .gb-engine-label.stable { color: #6ee7b7; }
        .gb-engine-label.unstable { color: #f87171; }

        /* SECTION LINE */
        .gb-line {
          position: relative; z-index: 1;
          margin: 0 3rem; height: 0.5px;
          background: linear-gradient(90deg, rgba(200,169,110,0.3), transparent);
          animation: gbFadeIn 0.6s ease forwards 0.6s; opacity: 0;
        }

        /* FILTERS */
        .gb-filters {
          position: relative; z-index: 1;
          padding: 2rem 3rem 0;
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
          animation: gbFadeUp 0.5s ease forwards 0.7s; opacity: 0;
        }
        .gb-filter-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #7a7a8c;
        }
        .gb-filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px;
          border: 0.5px solid rgba(200,169,110,0.15);
          background: transparent; color: #7a7a8c;
          cursor: pointer; transition: all 0.2s;
        }
        .gb-filter-btn:hover { color: #f0ede8; border-color: rgba(200,169,110,0.3); }
        .gb-filter-btn.active {
          border-color: #c8a96e;
          background: rgba(200,169,110,0.1);
          color: #c8a96e;
        }

        /* GRID */
        .gb-grid {
          position: relative; z-index: 1;
          padding: 2rem 3rem 6rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1px;
          background: rgba(200,169,110,0.08);
        }

        /* CARD */
        .gb-card {
          background: #080810;
          padding: 2.5rem;
          position: relative; overflow: hidden;
          cursor: pointer; text-decoration: none;
          color: inherit; display: block;
          opacity: 0; transform: translateY(20px);
          transition: background 0.4s ease;
        }
        .gb-card:nth-child(1)  { animation: gbFadeUp 0.5s ease forwards 0.8s; }
        .gb-card:nth-child(2)  { animation: gbFadeUp 0.5s ease forwards 0.85s; }
        .gb-card:nth-child(3)  { animation: gbFadeUp 0.5s ease forwards 0.9s; }
        .gb-card:nth-child(4)  { animation: gbFadeUp 0.5s ease forwards 0.95s; }
        .gb-card:nth-child(5)  { animation: gbFadeUp 0.5s ease forwards 1.0s; }
        .gb-card:nth-child(6)  { animation: gbFadeUp 0.5s ease forwards 1.05s; }
        .gb-card:nth-child(7)  { animation: gbFadeUp 0.5s ease forwards 1.1s; }
        .gb-card:nth-child(8)  { animation: gbFadeUp 0.5s ease forwards 1.15s; }
        .gb-card:nth-child(9)  { animation: gbFadeUp 0.5s ease forwards 1.2s; }
        .gb-card:nth-child(n+10) { animation: gbFadeUp 0.5s ease forwards 1.25s; }

        .gb-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(200,169,110,0.04) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.4s;
        }
        .gb-card:hover { background: #0d0d1a; }
        .gb-card:hover::before { opacity: 1; }
        .gb-card:hover .gb-card-topline { width: 100%; }
        .gb-card:hover .gb-card-number { color: #c8a96e; }
        .gb-card:hover .gb-card-arrow { transform: translate(4px, -4px); opacity: 1; }
        .gb-card:hover .gb-card-play { background: #c8a96e; color: #080810; }

        .gb-card-topline {
          position: absolute; top: 0; left: 0;
          height: 1px; width: 0; background: #c8a96e;
          transition: width 0.4s ease;
        }
        .gb-card-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .gb-card-number {
          font-family: 'DM Mono', monospace;
          font-size: 11px; color: #7a7a8c;
          letter-spacing: 0.15em; transition: color 0.3s;
        }
        .gb-card-badges { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .gb-hot-badge {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #fb923c;
          border: 0.5px solid rgba(251,146,60,0.4);
          background: rgba(251,146,60,0.08);
          padding: 3px 8px; border-radius: 100px;
        }
        .gb-cat-badge {
          font-family: 'DM Mono', monospace;
          font-size: 9px; color: #7a7a8c;
          letter-spacing: 0.15em; text-transform: uppercase;
        }
        .gb-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 700;
          line-height: 1.1; margin-bottom: 0.75rem;
          letter-spacing: -0.01em; color: #f0ede8;
        }
        .gb-card-desc {
          font-size: 12px; color: #7a7a8c;
          line-height: 1.7; margin-bottom: 2rem;
        }
        .gb-card-footer {
          display: flex; align-items: center; justify-content: space-between;
        }
        .gb-card-play {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #c8a96e;
          border: 0.5px solid rgba(200,169,110,0.3);
          background: transparent; border-radius: 100px;
          padding: 7px 16px; cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .gb-card-arrow {
          width: 32px; height: 32px;
          border: 0.5px solid rgba(200,169,110,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: #c8a96e;
          opacity: 0.4; transition: transform 0.3s, opacity 0.3s;
        }

        /* EMPTY */
        .gb-empty {
          position: relative; z-index: 1;
          padding: 8rem 3rem; text-align: center;
        }
        .gb-empty-icon { font-size: 48px; opacity: 0.15; margin-bottom: 1.5rem; }
        .gb-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; color: #7a7a8c; margin-bottom: 0.5rem;
        }
        .gb-empty-sub { font-size: 13px; color: #7a7a8c; opacity: 0.5; }

        /* LOCKED SCREEN */
        .gb-locked {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 2rem;
        }
        .gb-locked-eyebrow {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #c8a96e; margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 10px;
        }
        .gb-locked-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900; line-height: 1.05;
          color: #f0ede8; margin-bottom: 1rem;
        }
        .gb-locked-title span { color: #c8a96e; }
        .gb-locked-desc { font-size: 14px; color: #7a7a8c; max-width: 400px; line-height: 1.7; margin-bottom: 2rem; }

        /* ANIMATIONS */
        @keyframes gbFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gbPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes gbScan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .gb-scan-inner {
          height: 100%; width: 25%; border-radius: 100px;
          background: linear-gradient(90deg, transparent, #c8a96e, transparent);
          animation: gbScan 1.4s ease-in-out infinite;
        }
      `}</style>

      <div className="gb-root">
        {/* CLICK TRAIL */}
        <div className="gb-trail">
          <AnimatePresence>
            {clicks.map((click) => (
              <motion.div
                key={click.id}
                initial={{ opacity: 0.7, scale: 0.2, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, y: -40 }}
                exit={{ opacity: 0 }}
                style={{ left: click.x - 10, top: click.y - 10, position: "absolute" }}
              >
                <Star size={18} fill="#c8a96e" color="#c8a96e" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* TERMS OVERLAY */}
        <AnimatePresence>
          {showTerms && (
            <motion.div
              className="gb-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <motion.div
                className="gb-modal"
                initial={{ scale: 0.92, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 16 }}
              >
                <p className="gb-modal-eyebrow">System Notice</p>
                <h2>Access Conditions</h2>
                <div className="gb-modal-body">
                  <strong>Disclaimer</strong>
                  This portal is designed for independent use only. By continuing, you acknowledge that you are responsible for how and where you access this content.
                  <strong>Usage Restrictions</strong>
                  Do not present or distribute this portal in environments where it is not allowed. Always follow your local rules and guidelines.
                  <strong>Responsibility</strong>
                  You assume full responsibility for any consequences that may occur if these conditions are ignored.
                  <strong>Agreement</strong>
                  By selecting "Enter Site", you confirm that you understand and agree to these conditions.
                </div>
                <div className="gb-modal-actions">
                  <button
                    className="gb-enter-btn"
                    onClick={() => {
                      setShowTerms(false);
                      setSearching(true);
                      setTimeout(() => setSearching(false), 4000);
                    }}
                  >
                    Enter Site
                  </button>
                  <span className="gb-modal-hint">If you disagree, close this tab.</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCANNING OVERLAY */}
        <AnimatePresence>
          {searching && (
            <motion.div
              className="gb-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <motion.div
                className="gb-modal"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
              >
                <p className="gb-modal-eyebrow">Checking IP status</p>
                <h2>Scanning…</h2>
                <p style={{ fontSize: 13, color: "#7a7a8c", marginBottom: "1.5rem", lineHeight: 1.7 }}>
                  Checking to see if you are in school zones across the USA.
                </p>
                <div className="gb-scan-bar">
                  <div className="gb-scan-inner" />
                </div>
                <p style={{ fontSize: 10, color: "#7a7a8c", marginTop: "1rem", letterSpacing: "0.1em" }}>
                  Do not close this tab
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {timeUnlocked ? (
          <>
            <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

            {/* HERO */}
            <section className="gb-hero">
              <p className="gb-eyebrow">Game Hub</p>
              <h1 className="gb-title">
                <span className="solid">Game</span>
                <span className="outline">Boys</span>
              </h1>
              <div className="gb-meta">
                <div className="gb-count">
                  <strong>{filteredGames.length}</strong>
                  {filteredGames.length !== 1 ? " games available" : " game available"}
                </div>
                <div className="gb-divider" />
                <div className="gb-engine">
                  <span className={`gb-engine-dot ${engineStatus === "STABLE" ? "stable" : "unstable"}`} />
                  <span className={`gb-engine-label ${engineStatus === "STABLE" ? "stable" : "unstable"}`}>
                    Engine {engineStatus}
                  </span>
                </div>
              </div>
            </section>

            <div className="gb-line" />

            {/* FILTERS */}
            <div className="gb-filters">
              <span className="gb-filter-label">Filter</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`gb-filter-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* GRID */}
            {filteredGames.length > 0 ? (
              <div className="gb-grid">
                {filteredGames.map((game, i) => (
                  
                    key={game.name}
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gb-card"
                  >
                    <div className="gb-card-topline" />
                    <div className="gb-card-header">
                      <div className="gb-card-number">{pad(i + 1)}</div>
                      <div className="gb-card-badges">
                        {game.hot && <span className="gb-hot-badge">⚡ Hot</span>}
                        <span className="gb-cat-badge">{game.category}</span>
                      </div>
                    </div>
                    <h2 className="gb-card-name">{game.name}</h2>
                    <p className="gb-card-desc">{game.description}</p>
                    <div className="gb-card-footer">
                      <span className="gb-card-play">▶ Play</span>
                      <div className="gb-card-arrow">↗</div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="gb-empty">
                <div className="gb-empty-icon">◎</div>
                <h2 className="gb-empty-title">Nothing found</h2>
                <p className="gb-empty-sub">Try a different search or filter</p>
              </div>
            )}

            <VersionFooter />
          </>
        ) : (
          <div className="gb-locked">
            <p className="gb-locked-eyebrow">
              <Cpu size={16} color="#c8a96e" /> Access Locked
            </p>
            <h1 className="gb-locked-title">
              Portal opens at<br />
              <span>3:45 PM Eastern</span>
            </h1>
            <p className="gb-locked-desc">
              GameBoys services are offline until the scheduled window. The index, search,
              and launch buttons will activate once the timer completes.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#7a7a8c", fontSize: 12 }}>
              <Cpu size={14} color="#c8a96e" />
              <span style={{ letterSpacing: "0.1em" }}>Waiting for boot sequence…</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
