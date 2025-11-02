import React from 'react';
import { Hammer, Clock, ShieldCheck, Phone } from 'lucide-react';

const features = [
  {
    icon: Hammer,
    title: 'Services',
    text:
      'Residential & commercial builds, renovations, roofing, electrical, plumbing, and interior finishing.'
  },
  { icon: Clock, title: 'Working hours', text: 'Monday–Saturday, 08:00–18:00' },
  { icon: ShieldCheck, title: 'Warranty', text: 'Every project includes a workmanship warranty.' },
  { icon: Phone, title: 'Contact', text: 'Website form or call +389 XX XXX XXX' }
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-medium">{title}</h3>
          </div>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{text}</p>
        </div>
      ))}
    </div>
  );
}
