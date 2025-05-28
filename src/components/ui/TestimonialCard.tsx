'use client';

import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export function TestimonialCard({ name, role, image, quote, rating }: TestimonialProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gold-700/30 bg-background/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-gold-500/10 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 opacity-50 blur"></div>
          <div className="relative w-[60px] h-[60px] rounded-full border border-gold-500/20 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/placeholder.svg?height=60&width=60&text=${name.split(' ').map(n => n[0]).join('')}`;
              }}
            />
          </div>
        </div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-gold-400">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            key={starIndex}
            className={`h-5 w-5 ${
              starIndex < rating ? "text-gold-400 fill-gold-400" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <blockquote className="flex-1 text-muted-foreground">&ldquo;{quote}&rdquo;</blockquote>
    </div>
  );
} 