import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { EventsClient } from '@/components/pages/SupportAndUpdatesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getEvents() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'events',
      sort: '-date',
      limit: 50,
    });
    return res.docs || [];
  } catch (err) {
    console.error('Error fetching events:', err);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = events.filter((e: any) => e.status === 'upcoming');
  const pastEvents = events.filter((e: any) => e.status === 'past');

  return (
    <SiteShell>
      <EventsClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
    </SiteShell>
  );
}
