"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { VersionFooter } from "@/components/version-footer";

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

  const filteredGames = games.filter((game) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      game.name.toLowerCase().includes(q) ||
      game.description?.toLowerCase().includes(q);
    const matchesCategory =
      activeCategory === "All" || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <style>{`
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
        .gb-count strong {
          color: #c8a96e; font-size: 24px; font-weight: 400;
          margin-right: 4px; vertical-align: middle;
        }
        .gb-line {
          position: relative; z-index: 1;
          margin: 0 3rem; height: 0.5px;
          background: linear-gradient(90deg, rgba(200,169,110,0.3), transparent);
          animation: gbFadeIn 0.6s ease forwards 0.6s; opacity: 0;
        }
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
        .gb-grid {
          position: relative; z-index: 1;
          padding: 2rem 3rem 6rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1px;
          background: rgba(200,169,110,0.08);
        }
        .gb-card {
          background: #080810;
          padding: 2.5rem;
          position: relative; overflow: hidden;
          cursor: pointer; text-decoration: none;
          color: inherit; display: block;
          opacity: 0; transform: translateY(20px);
          transition: background 0.4s ease;
        }
        .gb-card:nth-child(1)    { animation: gbFadeUp 0.5s ease forwards 0.80s; }
        .gb-card:nth-child(2)    { animation: gbFadeUp 0.5s ease forwards 0.85s; }
        .gb-card:nth-child(3)    { animation: gbFadeUp 0.5s ease forwards 0.90s; }
        .gb-card:nth-child(4)    { animation: gbFadeUp 0.5s ease forwards 0.95s; }
        .gb-card:nth-child(5)    { animation: gbFadeUp 0.5s ease forwards 1.00s; }
        .gb-card:nth-child(6)    { animation: gbFadeUp 0.5s ease forwards 1.05s; }
        .gb-card:nth-child(7)    { animation: gbFadeUp 0.5s ease forwards 1.10s; }
        .gb-card:nth-child(8)    { animation: gbFadeUp 0.5s ease forwards 1.15s; }
        .gb-card:nth-child(9)    { animation: gbFadeUp 0.5s ease forwards 1.20s; }
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
        @keyframes gbFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div className="gb-root">
        <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />

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
          </div>
        </section>

        <div className="gb-line" />

        <div className="gb-filters">
          <span className="gb-filter-label">Filter</span>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`gb-filter-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredGames.length > 0 ? (
          <div className="gb-grid">
            {filteredGames.map((game, i) => (
              <a
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
      </div>
    </>
  );
}
