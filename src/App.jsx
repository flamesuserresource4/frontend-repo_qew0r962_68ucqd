import React from 'react';
import Hero from './components/Hero.jsx';
import FeatureCards from './components/FeatureCards.jsx';
import ChatBot from './components/ChatBot.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <Hero />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <FeatureCards />
            <div className="rounded-2xl p-6 bg-white border border-neutral-200">
              <h2 className="text-xl font-semibold">About StoneLine</h2>
              <p className="mt-2 text-sm text-neutral-600">
                We deliver residential and commercial projects with clear communication and reliable timelines. From structure to finish, our team handles construction, renovations, roofing, electrical, plumbing, and interiors — all backed by a workmanship warranty.
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <ChatBot />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
