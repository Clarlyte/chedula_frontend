'use client';

import React, { useState } from "react";

export const Hero = () => {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (chat.trim()) {
      setMessages([...messages, chat]);
      setChat("");
    }
  };

  return (
    <section className="w-full bg-black text-gold-400 py-16 px-4 flex flex-col md:flex-row items-center justify-center gap-12">
      {/* Left: Headline, subheadline, chat */}
      <div className="flex-1 max-w-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gold-400 leading-tight">
          Streamline Your <span className="text-gold-300">Camera Rental</span> Business
        </h1>
        <p className="text-lg md:text-xl text-gold-300 mb-8">
          Try our AI-powered scheduling assistant below!
        </p>
        <div className="bg-black/80 border border-gold-400 rounded-xl p-6 shadow-lg">
          <div className="h-40 overflow-y-auto mb-4 space-y-2">
            {messages.length === 0 ? (
              <div className="text-gold-300">Start a conversation with our AI assistant...</div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="bg-gold-400/10 p-2 rounded text-gold-200">{msg}</div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-2 rounded bg-black border border-gold-400 text-gold-400 focus:outline-none"
              placeholder="Type your message..."
              value={chat}
              onChange={e => setChat(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button
              className="px-4 py-2 rounded bg-gold-400 text-black font-semibold hover:bg-gold-300 transition"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {/* Right: Calendar placeholder */}
      <div className="flex-1 max-w-md w-full flex items-center justify-center">
        <div className="bg-black/80 border border-gold-400 rounded-xl p-6 shadow-lg w-full">
          <div className="text-center text-gold-300 mb-2 font-semibold">Calendar Preview</div>
          <div className="h-64 flex items-center justify-center text-gold-400 text-2xl border-2 border-dashed border-gold-300 rounded-lg">
            [Calendar Here]
          </div>
        </div>
      </div>
    </section>
  );
}; 