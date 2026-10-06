import React from 'react';
import Link from 'next/link';

export default function FrenchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-4xl mx-auto space-y-6" dir="ltr">
      <Link href="/" className="text-xs font-mono text-primary font-bold hover:underline">← Retour au portail hébreu</Link>
      <h1 className="text-3xl font-black">L'Association des Amis du Mamach</h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Le réseau Mamach offre aux familles orthodoxes francophones une éducation thoraïque authentique et rigoureuse sans compromis, alliée à un enseignement académique complet sous la supervision directe du Ministère de l'Éducation israélien.
      </p>
      <div className="p-6 bg-card border border-border rounded-xl space-y-2">
        <h3 className="font-bold text-base">Bureau d'accompagnement des Olim</h3>
        <p className="text-xs text-muted-foreground">
          Orientation et inscription personnalisée pour l'intégration des enfants dans les écoles et jardins d'enfants partout en Israël.
        </p>
      </div>
    </div>
  );
}
