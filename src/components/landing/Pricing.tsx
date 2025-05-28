'use client';

import React from "react";

const plans = [
  {
    name: "Starter",
    price: "₱999",
    period: "/month",
    features: [
      "Manage bookings and camera rentals",
      "SMS & email rental reminders",
      "1 admin user",
      "Up to 10 equipment entries",
      "Basic performance dashboard",
    ],
    cta: "Get Started",
    highlight: false,
    sub: "Perfect for solo owners",
    oldPrice: "₱1,999/month",
    badge: "Launch",
  },
  {
    name: "Pro",
    price: "₱1,999",
    period: "/month",
    features: [
      "All Starter features",
      "Unlimited equipment entries",
      "Booking analytics + trends",
      "Customer rental history",
      "Multi-admin access (up to 3 users)",
      "Discount & promo codes",
      "Priority support",
    ],
    cta: "Get Started",
    highlight: true,
    sub: "For scaling businesses",
    badge: "Popular",
  },
  {
    name: "Lifetime Pro",
    price: "₱14,999",
    period: "One-time payment",
    features: [
      "All Pro Plan features for life",
      "Access to all future upgrades",
      "No renewal fees ever",
      "Personalized onboarding",
    ],
    cta: "Get Lifetime Access",
    highlight: false,
    sub: "One-time payment",
    badge: "Best Value",
  },
];

export const Pricing = () => (
  <section id="pricing" className="w-full bg-black text-gold-400 py-16 px-4">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <span className="inline-block bg-gold-400/10 text-gold-300 px-4 py-1 rounded-full mb-4 font-semibold">Flexible Plans</span>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Pricing <span className="text-gold-300">Plans</span></h2>
      <p className="text-lg text-gold-300">Choose the plan that fits your business needs</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan, i) => (
        <div
          key={i}
          className={`relative bg-black/80 border border-gold-400 rounded-xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform ${plan.highlight ? "ring-4 ring-gold-400" : ""}`}
        >
          {plan.badge && (
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.highlight ? "bg-gold-400 text-black" : "bg-gold-400/20 text-gold-300"}`}>
              {plan.badge}
            </div>
          )}
          <div className="text-2xl font-bold mb-2 text-gold-400">{plan.name}</div>
          <div className="text-gold-300 mb-2">{plan.sub}</div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-extrabold text-gold-400">{plan.price}</span>
            <span className="text-gold-300 text-lg font-semibold">{plan.period}</span>
          </div>
          {plan.oldPrice && (
            <div className="text-gold-300 line-through mb-2">{plan.oldPrice}</div>
          )}
          <ul className="mb-6 space-y-2 text-gold-300 text-sm text-left">
            {plan.features.map((f, idx) => (
              <li key={idx}>• {f}</li>
            ))}
          </ul>
          <button className={`w-full px-4 py-2 rounded font-semibold ${plan.highlight ? "bg-gold-400 text-black hover:bg-gold-300" : "border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black"} transition`}>
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  </section>
); 