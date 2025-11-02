import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const BOT = {
  name: 'StoneLine Construction FAQ Bot',
  greeting: "Hi 👋 I’m StoneLine Bot! How can I help you today?",
  fallback:
    "I’m not sure about that, but I can connect you with a human project manager if you’d like. Would you like me to take your contact info?",
};

const FAQ = [
  {
    q: 'What services do you offer?',
    a: 'We handle residential and commercial construction, renovations, roofing, electrical, plumbing, and interior finishing.'
  },
  { q: 'Do you offer free estimates?', a: 'Yes! Every project starts with a free consultation and estimate.' },
  { q: 'Where are you located?', a: 'We’re based in North Macedonia and work across the surrounding region.' },
  { q: 'What are your working hours?', a: 'Monday–Saturday, 08:00–18:00.' },
  { q: 'Do you offer warranties?', a: 'Yes, all projects come with a workmanship warranty.' },
  { q: 'How can I contact you?', a: 'You can fill out the form on our website or call us at +389 XX XXX XXX.' },
  { q: 'Do you handle permits and paperwork?', a: 'Absolutely — we take care of all the documentation for your project.' },
  { q: 'Do you work with businesses?', a: 'Yes, we provide services for both residential and commercial clients.' },
  { q: 'Can I get urgent repairs?', a: 'Yes, we offer emergency repairs when possible.' },
  { q: 'What makes StoneLine unique?', a: 'Quality, transparency, and reliable craftsmanship — we treat every project as if it were our own home.' },
];

function findAnswer(input) {
  const text = input.toLowerCase();

  // Quick intents
  if (/(^|\b)(estimate|quote)($|\b)/.test(text) || /(contact|call|reach)/.test(text)) {
    return { intent: 'contact_start', reply: 'Happy to help with a free estimate. Please share your name and the best phone or email.' };
  }

  // Normalize and match FAQ by keywords
  const rules = [
    { key: 'services', match: ['service', 'services', 'what do you offer', 'do you offer'], idx: 0 },
    { key: 'estimate', match: ['estimate', 'quote', 'free'], idx: 1 },
    { key: 'location', match: ['where', 'located', 'location', 'north macedonia'], idx: 2 },
    { key: 'hours', match: ['hours', 'open', 'time', 'schedule'], idx: 3 },
    { key: 'warranty', match: ['warranty', 'guarantee'], idx: 4 },
    { key: 'contact', match: ['contact', 'phone', 'call'], idx: 5 },
    { key: 'permits', match: ['permit', 'permits', 'paperwork', 'documentation'], idx: 6 },
    { key: 'business', match: ['business', 'commercial', 'company'], idx: 7 },
    { key: 'urgent', match: ['urgent', 'emergency', 'repairs'], idx: 8 },
    { key: 'unique', match: ['unique', 'why', 'different'], idx: 9 },
  ];

  for (const r of rules) {
    if (r.match.some((m) => text.includes(m))) {
      return { intent: 'faq', reply: FAQ[r.idx].a };
    }
  }

  return { intent: 'fallback', reply: BOT.fallback };
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: BOT.greeting }
  ]);
  const [input, setInput] = useState('');
  const [collectingContact, setCollectingContact] = useState(false);
  const [contactCaptured, setContactCaptured] = useState(false);
  const endRef = useRef(null);

  const suggested = useMemo(
    () => [
      'Services',
      'Free estimate',
      'Working hours',
      'Contact',
      'Urgent repairs'
    ],
    []
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = (text) => {
    const userText = (text ?? input).trim();
    if (!userText) return;

    const userMsg = { from: 'user', text: userText };
    setMessages((m) => [...m, userMsg]);

    // If collecting contact, capture next message as contact info
    if (collectingContact) {
      setCollectingContact(false);
      setContactCaptured(true);
      const reply =
        'Got it — a project manager will reach out shortly. Anything else I can help with today?';
      setMessages((m) => [...m, { from: 'bot', text: reply }]);
      setInput('');
      return;
    }

    const { intent, reply } = findAnswer(userText);

    if (intent === 'contact_start') {
      setCollectingContact(true);
    }

    setMessages((m) => [...m, { from: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <section className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">StoneLine Bot</h2>
          <p className="text-xs text-neutral-500">Friendly, fast answers about StoneLine Construction</p>
        </div>
      </div>

      <div className="h-[380px] overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                m.from === 'bot'
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                  : 'bg-orange-500 text-white'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {suggested.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={
              collectingContact
                ? 'Your name and phone/email...'
                : 'Ask about services, hours, estimates, or contact...'
            }
            className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500/30"
          />
          <button
            onClick={() => handleSend()}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 text-white px-3 py-2 text-sm hover:bg-orange-600 transition"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">
          If a question isn’t in the FAQ, I’ll offer to connect you with a human project manager.
        </p>
      </div>
    </section>
  );
}
