import React from "react";

export const Calendar = () => {
  return (
    <section className="w-full bg-black py-16 px-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gold-400 mb-8">Calendar</h2>
      <div className="w-full max-w-4xl h-[500px] bg-[#111]/80 border border-gold-400/20 rounded-xl flex items-center justify-center text-gold-400 text-xl">
        {/* Google Calendar integration will go here */}
        [Google Calendar Placeholder]
      </div>
    </section>
  );
}; 