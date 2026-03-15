"use client";

import { useState, useEffect } from "react";

export function VersionFooter() {
  const [version, setVersion] = useState("0.0.0");
  const [buildId, setBuildId] = useState(0);

  useEffect(() => {
    const major = Math.floor(Math.random() * 99) + 1;
    const minor = Math.floor(Math.random() * 99);
    const patch = Math.floor(Math.random() * 999);
    setVersion(`${major}.${minor}.${patch}`);
    setBuildId(Math.floor(Math.random() * 1000000) + 1);
  }, []);

  return (
    <>
      <style>{`
        .gb-footer {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          border-top: 0.5px solid rgba(200,169,110,0.15);
          background: #080810;
          overflow: hidden;
        }
        .gb-footer::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,169,110,0.3), transparent);
        }
        .gb-footer-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 3rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 2rem;
        }
        .gb-footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 900;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #f0ede8;
        }
        .gb-footer-brand span { color: #c8a96e; }
        .gb-footer-tagline {
          font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
          color: #7a7a8c; margin-top: 4px;
        }
        .gb-footer-stats {
          display: flex; align-items: center; gap: 3rem;
        }
        .gb-footer-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #7a7a8c; margin-bottom: 6px;
        }
        .gb-footer-stat-value {
          font-family: 'DM Mono', monospace;
          font-size: 13px; color: #c8a96e; letter-spacing: 0.1em;
        }
        .gb-footer-status {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
          color: #6ee7b7;
          border: 0.5px solid rgba(110,231,183,0.3);
          background: rgba(110,231,183,0.06);
          padding: 4px 10px; border-radius: 100px;
        }
        .gb-footer-status::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: #6ee7b7;
          box-shadow: 0 0 6px rgba(110,231,183,0.7);
        }
        .gb-footer-bottom {
          border-top: 0.5px solid rgba(200,169,110,0.08);
          padding: 1.25rem 3rem;
          max-width: 1400px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .gb-footer-copy {
          font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #7a7a8c; opacity: 0.5;
        }
      `}</style>

      <footer className="gb-footer">
        <div className="gb-footer-inner">
          <div>
            <div className="gb-footer-brand">Game<span>Boys</span></div>
            <div className="gb-footer-tagline">Gateway to games · proxies · apps</div>
          </div>
          <div className="gb-footer-stats">
            <div>
              <div className="gb-footer-stat-label">Build ID</div>
              <div className="gb-footer-stat-value">#{buildId.toLocaleString()}</div>
            </div>
            <div>
              <div className="gb-footer-stat-label">Firmware</div>
              <div className="gb-footer-stat-value">v.{version}</div>
            </div>
            <div>
              <div className="gb-footer-stat-label">System</div>
              <div className="gb-footer-status">Engine Stable</div>
            </div>
          </div>
        </div>
        <div className="gb-footer-bottom">
          <p className="gb-footer-copy">
            © {new Date().getFullYear()} Gameboys Network · All encrypted protocols active.
          </p>
        </div>
      </footer>
    </>
  );
}
