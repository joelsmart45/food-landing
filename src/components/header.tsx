"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "@/lib/supabase/actions";
import { getUser } from "@/lib/supabase/actions";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const u = await getUser();
      setUser(u);
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl text-green-600">🥗</span>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              FreshBites
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="text-gray-600 hover:text-green-600 font-medium transition-colors"
                  >
                    Account
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-green-600 font-medium transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-green-600 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600"
            aria-label="Open menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-600 hover:text-green-600 px-3 py-2 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-600 hover:text-green-600 px-3 py-2 rounded-lg"
                  >
                    Account
                  </Link>
                  <button
                    onClick={async () => {
                      await handleSignOut();
                      setMenuOpen(false);
                    }}
                    className="block text-gray-600 hover:text-green-600 px-3 py-2 rounded-lg w-full text-left"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-600 hover:text-green-600 px-3 py-2 rounded-lg"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="block bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
