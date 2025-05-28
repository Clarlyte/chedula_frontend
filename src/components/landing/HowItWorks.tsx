'use client';

import React from "react";

const steps = [
  {
    icon: "1",
    title: "Customer Books Equipment",
    desc: "Customers select equipment and preferred rental dates",
  },
  {
    icon: "2",
    title: "System Checks Availability",
    desc: "Automatic verification ensures no scheduling conflicts",
  },
  {
    icon: "3",
    title: "Contract Generation",
    desc: "Digital contract is created with customer details and rental terms",
  },
  {
    icon: "4",
    title: "ID Verification",
    desc: "Customer uploads ID for verification and security",
  },
  {
    icon: "5",
    title: "Digital Signature",
    desc: "Customer signs the contract electronically",
  },
  {
    icon: "6",
    title: "Rental Confirmed",
    desc: "Both parties receive confirmation and rental details",
  },
];

export const HowItWorks = () => (
  <section id="how-it-works" className="w-full bg-black text-gold-400 py-16 px-4">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <span className="inline-block bg-gold-400/10 text-gold-300 px-4 py-1 rounded-full mb-4 font-semibold">Simple Process</span>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">How It <span className="text-gold-300">Works</span></h2>
      <p className="text-lg text-gold-300">Simple process for both rental shop owners and customers</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center bg-black/80 border border-gold-400 rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gold-400 text-black text-2xl font-bold mb-4">{step.icon}</div>
          <div className="text-lg font-bold mb-2 text-gold-400 text-center">{step.title}</div>
          <div className="text-gold-300 text-center text-sm">{step.desc}</div>
        </div>
      ))}
    </div>
  </section>
); 