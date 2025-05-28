import React from "react";

export const Footer = () => (
  <footer className="bg-black text-gold-400 py-10 px-8 mt-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
      <div>
        <div className="text-2xl font-bold mb-2">📸 Rent n' Snap</div>
        <p className="max-w-xs text-gold-300">Streamline your camera rental business with our powerful platform.</p>
        <div className="flex gap-3 mt-4">
          <a href="#" aria-label="Instagram" className="hover:text-gold-300">Instagram</a>
          <a href="#" aria-label="Facebook" className="hover:text-gold-300">Facebook</a>
          <a href="#" aria-label="Twitter" className="hover:text-gold-300">Twitter</a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li><a href="#features" className="hover:text-gold-300">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-gold-300">How It Works</a></li>
            <li><a href="#testimonials" className="hover:text-gold-300">Testimonials</a></li>
            <li><a href="#pricing" className="hover:text-gold-300">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Legal</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-gold-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gold-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gold-300">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <ul className="space-y-1 text-gold-300">
            <li>rentnsnap.ph@gmail.com</li>
            <li>+639641412274</li>
            <li>Gorordo Avenue, Lahug Cebu City, 6000</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="text-center text-gold-300 mt-8 text-sm">© 2025 Rent n' Snap. All rights reserved.</div>
  </footer>
); 