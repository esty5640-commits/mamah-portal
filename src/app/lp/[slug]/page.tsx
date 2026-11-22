import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLandingPageBySlug } from '@/lib/landingPages';
import { getAuthStatus } from '@/lib/adminAuth';
import { LandingPageRenderer } from '@/components/LandingPageRenderer';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);

  if (!page) {
    return {
      title: 'דף נחיתה לא נמצא | אגודת ידידי הממ״ח',
    };
  }

  if (page.status !== 'published') {
    const { isAdmin } = await getAuthStatus();
    if (!isAdmin) {
      return {
        title: 'דף לא נמצא | אגודת ידידי הממ״ח',
      };
    }
  }

  return {
    title: `${page.title} | אגודת ידידי הממ״ח`,
    description: page.subtitle || page.title,
    openGraph: {
      title: page.title,
      description: page.subtitle || page.title,
      images: page.heroImage ? [page.heroImage] : ['/logo.png'],
    },
  };
}

export default async function LandingPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  if (page.status !== 'published') {
    const { isAdmin } = await getAuthStatus();
    if (!isAdmin) {
      notFound();
    }
  }

  return <LandingPageRenderer page={page} />;
}
