'use client';

import React from "react";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, PixelPerfect Rentals",
    review: "Since implementing Rent n' Snap, our booking errors have decreased by 95%. The digital contracts and ID verification have saved us countless hours of paperwork.",
  },
  {
    name: "Juan Reyes",
    role: "Manager, Manila Camera Hub",
    review: "The scheduling system is flawless. We can now manage multiple locations from a single dashboard, and our customers love the professional experience.",
  },
  {
    name: "Sofia Cruz",
    role: "Owner, LensMasters Philippines",
    review: "Rent n' Snap has completely transformed how we manage our premium equipment. The gold-standard security features give us peace of mind with high-value rentals.",
  },
  {
    name: "Isabella Garcia",
    role: "Owner, Davao Camera Co.",
    review: "The customer experience is seamless from booking to return. Our clients specifically mention how professional our process has become.",
  },
  {
    name: "Rafael Tan",
    role: "Manager, ProCam Rentals",
    review: "The analytics dashboard helps us make informed decisions about inventory. We've optimized our equipment selection based on the data and increased profitability.",
  },
];

export const Testimonials = () => (
  <section id="testimonials" className="w-full bg-black text-gold-400 py-16 px-4">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <span className="inline-block bg-gold-400/10 text-gold-300 px-4 py-1 rounded-full mb-4 font-semibold">Client Success Stories</span>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">What Our <span className="text-gold-300">Clients Say</span></h2>
      <p className="text-lg text-gold-300">Hear from rental shop owners who transformed their business with Rent n' Snap</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-black/80 border border-gold-400 rounded-xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, idx) => (
              <span key={idx} className="text-gold-400 text-xl">★</span>
            ))}
          </div>
          <div className="text-lg font-bold mb-1 text-gold-400">{t.name}</div>
          <div className="text-gold-300 mb-2 text-sm">{t.role}</div>
          <div className="text-gold-200 text-center">{t.review}</div>
        </div>
      ))}
    </div>
  </section>
); 