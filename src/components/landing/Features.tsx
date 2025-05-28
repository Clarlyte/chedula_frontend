'use client';

import React from "react";

const features = [
  {
    icon: "📅",
    title: "Smart Scheduling",
    desc: "Automatically check availability and prevent double bookings",
  },
  {
    icon: "📝",
    title: "Auto Contracts",
    desc: "Generate professional rental agreements with just a few clicks",
  },
  {
    icon: "🪪",
    title: "ID Verification",
    desc: "Securely collect and store customer identification",
  },
  {
    icon: "✍️",
    title: "Digital Signatures",
    desc: "Legally binding electronic signatures for all contracts",
  },
  {
    icon: "🔄",
    title: "Flexible Scheduling",
    desc: "Allow admins to modify bookings and handle change requests",
  },
  {
    icon: "📷",
    title: "Equipment Management",
    desc: "Track your inventory and maintenance schedules",
  },
];

export const Features = () => (
  <section id="features" className="w-full bg-black text-gold-400 py-16 px-4">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <span className="inline-block bg-gold-400/10 text-gold-300 px-4 py-1 rounded-full mb-4 font-semibold">Premium Features</span>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Powerful <span className="text-gold-300">Features</span></h2>
      <p className="text-lg text-gold-300">Everything you need to run your camera rental business efficiently</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map((f, i) => (
        <div key={i} className="bg-black/80 border border-gold-400 rounded-xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">{f.icon}</div>
          <div className="text-xl font-bold mb-2 text-gold-400">{f.title}</div>
          <div className="text-gold-300 text-center">{f.desc}</div>
        </div>
      ))}
    </div>
  </section>
); 