"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar({
  onSearch,
  searchQuery = "",
}: {
  onSearch?: (q: string) => void;
  searchQuery?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Games" },
    { href: "/order", label: "View Orders" },
    { href: "/order/new", label: "Make Order" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');

        .gb-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          transition: background 0.3s, border-color 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .gb-nav.scrolled {
          background: rgba(8,8,16,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 0.5px solid rgba(200,169,110,0.15);
        }
        .gb-nav.top {
          background: linear-gradient(to bottom, rgba(8,8,16,0.85), transparent);
        }
        .gb-nav-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 3rem;
          height: 72px;
          display: flex; align-items: center; justify-content: space-between; gap: 2rem;
        }
        .gb-nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 900;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #f0ede8; text-decoration: none; flex-shrink: 0;
        }
        .gb-nav-logo span { color: #c8a96e; }
        .gb-nav-search {
          flex: 1; max-width: 400px;
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(200,169,110,0.15);
          border-radius: 100px; padding: 8px 16px;
          transition: border-color 0.2s;
        }
        .gb-nav-search:focus-within { border-color: rgba(200,169,110,0.35); }
        .gb-nav-search input {
          background: none; border: none; outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #f0ede8; width: 100%;
        }
        .gb-nav-search input::placeholder { color: #7a7a8c; }
        .gb-nav-links {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(200,169,110,0.12);
          border-radius: 100px; padding: 4px; gap: 0;
        }
        .gb-nav-link {
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 100px;
          color: #7a7a8c; text-decoration: none;
          transition: all 0.2s; border: 0.5px solid transparent;
        }
        .gb-nav-link:hover { color: #f0ede8; }
        .gb-nav-link.active {
          background: rgba(200,169,110,0.12);
          border-color: rgba(200,169,110,0.3);
          color: #c8a96e;
        }
        .gb-nav-auth { display: flex; align-items: center; gap: 10px; }
        .gb-nav-login {
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #7a7a8c; background: none; border: none; cursor: pointer;
          transition: color 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .gb-nav-login:hover { color: #f0ede8; }
        .gb-nav-join {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #080810; background: #c8a96e;
          border: none; border-radius: 100px;
          padding: 8px 18px; cursor: pointer;
          transition: background 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .gb-nav-join:hover { background: #e8c87e; }
        .gb-nav-toggle {
          display: none;
          width: 36px; height: 36px;
          align-items: center; justify-content: center;
          border: 0.5px solid rgba(200,169,110,0.2);
          border-radius: 50%; background: none; cursor: pointer;
          color: #f0ede8; transition: border-color 0.2s;
        }
        .gb-nav-toggle:hover { border-color: rgba(200,169,110,0.4); }
        .gb-mobile-menu {
          background: rgba(8,8,16,0.97);
          border-top: 0.5px solid rgba(200,169,110,0.1);
          padding: 1.5rem 2rem;
          overflow: hidden;
        }
        .gb-mobile-menu.closed { display: none; }
        .gb-mobile-search {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(200,169,110,0.15);
          border-radius: 100px; padding: 8px 14px;
          margin-bottom: 1rem;
        }
        .gb-mobile-search input {
          background: none; border: none; outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #f0ede8; width: 100%;
        }
        .gb-mobile-search input::placeholder { color: #7a7a8c; }
        .gb-mobile-link {
          display: block;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 10px 12px; border-radius: 8px;
          color: #7a7a8c; text-decoration: none;
          transition: all 0.2s; margin-bottom: 4px;
          border: 0.5px solid transparent;
        }
        .gb-mobile-link:hover { color: #f0ede8; background: rgba(255,255,255,0.03); }
        .gb-mobile-link.active {
          color: #c8a96e; background: rgba(200,169,110,0.08);
          border-color: rgba(200,169,110,0.2);
        }
        .gb-mobile-auth {
          display: flex; gap: 8px; margin-top: 1rem;
          padding-top: 1rem;
          border-top: 0.5px solid rgba(200,169,110,0.1);
        }
        .gb-mobile-auth button {
          flex: 1; font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 9px; border-radius: 100px; cursor: pointer;
        }
        @media (max-width: 1024px) {
          .gb-nav-links { display: none; }
          .gb-nav-search { display: none; }
          .gb-nav-toggle { display: flex; }
          .gb-nav-auth { display: none; }
          .gb-nav-inner { padding: 0 1.5rem; }
        }
      `}</style>

      <header className={`gb-nav${isScrolled ? " scrolled" : " top"}`}>
        <div className="gb-nav-inner">
          <Link href="/" className="gb-nav-logo">
            Game<span>Boys</span>
          </Link>

          <div className="gb-nav-search">
            <Search size={14} color="#7a7a8c" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search games…"
            />
          </div>

          <nav className="gb-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`gb-nav-link${pathname === link.href ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {user ? (
            <UserMenu user={user} signOut={signOut} />
          ) : (
            <div className="gb-nav-auth">
              <button className="gb-nav-login" onClick={() => router.push("/signin")}>
                Login
              </button>
              <button className="gb-nav-join" onClick={() => router.push("/signup")}>
                Join
              </button>
            </div>
          )}

          <button
            className="gb-nav-toggle"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className={`gb-mobile-menu${mobileOpen ? "" : " closed"}`}>
          <div className="gb-mobile-search">
            <Search size={14} color="#7a7a8c" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search games…"
            />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`gb-mobile-link${pathname === link.href ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <div className="gb-mobile-auth">
              <button
                style={{ background: "transparent", border: "0.5px solid rgba(200,169,110,0.2)", color: "#f0ede8" }}
                onClick={() => { router.push("/signin"); setMobileOpen(false); }}
              >
                Login
              </button>
              <button
                style={{ background: "#c8a96e", border: "none", color: "#080810" }}
                onClick={() => { router.push("/signup"); setMobileOpen(false); }}
              >
                Join
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

function UserMenu({ user, signOut }: { user: any; signOut: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(200,169,110,0.2)",
          borderRadius: 100, padding: "4px 12px 4px 4px",
          outline: "none", cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "#c8a96e",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#080810",
          }}
        >
          {user.name?.[0] || <User size={14} />}
        </div>
        <span style={{ fontSize: 12, color: "#f0ede8", fontFamily: "'DM Sans', sans-serif" }}>
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{
          background: "rgba(8,8,16,0.98)",
          border: "0.5px solid rgba(200,169,110,0.15)",
          borderRadius: 12,
        }}
      >
        <DropdownMenuItem
          style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f0ede8" }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator style={{ background: "rgba(200,169,110,0.1)" }} />
        <DropdownMenuItem
          onClick={signOut}
          style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f87171" }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
