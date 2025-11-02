import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Soft gradient overlay for readability - does not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 h-full flex items-end md:items-center">
        <div className="p-6 md:p-10 text-white max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-xs md:text-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            Friendly Construction Assistant
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
            StoneLine Construction
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/80">
            Quality, transparency, and reliable craftsmanship — we treat every project as if it were our own home.
          </p>
        </div>
      </div>
    </section>
  );
}
