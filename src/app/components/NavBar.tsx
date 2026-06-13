"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";
import "./NavBar.css";
import "./Footer.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Sellers", href: "/sellers" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
    setMenuOpen(false);
  };

  return (
    <nav>
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          Handcrafted Haven
        </Link>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn-login"
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="btn-login">
                Login
              </Link>
              <Link href="/signup" className="btn-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-mobile ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div className="navbar-mobile-actions">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn-login"
              style={{
                cursor: "pointer",
                width: "100%",
                textAlign: "center",
                border: "none",
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="btn-login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="btn-signup"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}