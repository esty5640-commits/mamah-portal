import React from 'react';
import Link from 'next/link';

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-4xl mx-auto space-y-6" dir="ltr">
      <Link href="/" className="text-xs font-mono text-primary font-bold hover:underline">← Back to Hebrew Portal</Link>
      <h1 className="text-3xl font-black">Friends of State Haredi Education (Mamach)</h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        State Haredi Education combines authentic Torah excellence with a complete, accredited state core curriculum (fluent English, mathematics, science, and computing) under full Ministry of Education supervision.
      </p>
      <div className="p-6 bg-card border border-border rounded-xl space-y-2">
        <h3 className="font-bold text-base">Olim Communities Support</h3>
        <p className="text-xs text-muted-foreground">
          We assist Anglo-Saxon and international Olim families finding schools in Jerusalem, Beit Shemesh, Rehovot, and nationwide.
        </p>
      </div>
    </div>
  );
}
