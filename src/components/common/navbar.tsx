import React from "react";

export const Navbar = () => (
  <nav className="w-full flex items-center justify-between px-8 py-4 bg-black text-gold-400 shadow-lg">
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-gold-400">📸 Rent n' Snap</span>
    </div>
    <div className="hidden md:flex gap-8 text-lg font-medium">
      <a href="#features" className="hover:text-gold-300 transition">Features</a>
      <a href="#how-it-works" className="hover:text-gold-300 transition">How It Works</a>
      <a href="#testimonials" className="hover:text-gold-300 transition">Testimonials</a>
      <a href="#pricing" className="hover:text-gold-300 transition">Pricing</a>
    </div>
    <div className="flex gap-4">
      <button className="px-4 py-2 rounded border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition">Log In</button>
      <button className="px-4 py-2 rounded bg-gold-400 text-black font-semibold hover:bg-gold-300 transition">Sign Up</button>
    </div>
  </nav>
);

// Add the following to your Tailwind config for gold colors:
// theme: { extend: { colors: { 'gold-400': '#FFD700', 'gold-300': '#FFE066' } } } 