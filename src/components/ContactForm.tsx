'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 tactile-border text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold">הפנייה נשלחה בהצלחה!</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          תודה על פנייתך. רכז מטעם אגודת ידידי הממ״ח יצור איתך קשר בהקדם.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-xs font-bold text-primary hover:underline"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 tactile-border space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono font-medium">שם ההורה *</label>
            <input
              required
              placeholder="ישראל ישראלי"
              className="w-full p-2.5 bg-background border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono font-medium">שם התלמיד/ה</label>
            <input
              placeholder="שם הילד/ה"
              className="w-full p-2.5 bg-background border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono font-medium">מספר טלפון *</label>
            <input
              type="tel"
              required
              placeholder="050-0000000"
              className="w-full p-2.5 bg-background border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono font-medium">עיר מגורים *</label>
            <input
              required
              placeholder="ירושלים / בית שמש..."
              className="w-full p-2.5 bg-background border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono font-medium">פירוט הפנייה *</label>
          <textarea
            rows={3}
            required
            placeholder="פרט את נושא הפנייה..."
            className="w-full p-2.5 bg-background border border-border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg text-xs hover:bg-primary/90 transition-colors shadow-[2px_2px_0px_0px_hsl(var(--primary))]"
        >
          שליחת פנייה לצוות האגודה ←
        </button>
      </form>
    </div>
  );
}
