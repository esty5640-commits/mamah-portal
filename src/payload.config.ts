import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Institutions } from './collections/Institutions';
import { Pages } from './collections/Pages';
import { Inquiries } from './collections/Inquiries';
import { Media } from './collections/Media';
import { MediaCoverage } from './collections/MediaCoverage';
import { Updates } from './collections/Updates';
import { Events } from './collections/Events';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  sharp,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - פורטל ידידי הממ״ח',
    },
  },
  localization: {
    locales: [
      { label: 'עברית', code: 'he', rtl: true },
      { label: 'English', code: 'en', rtl: false },
      { label: 'Français', code: 'fr', rtl: false },
    ],
    defaultLocale: 'he',
    fallback: true,
  },
  collections: [
    Users,
    Institutions,
    Pages,
    Inquiries,
    MediaCoverage,
    Updates,
    Events,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'mamah-portal-payload-super-secret-key-2026',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb+srv://admin:rhfRSvyYPwBgdQfh@cluster0.2qdoidx.mongodb.net/mamah_portal?retryWrites=true&w=majority&appName=Cluster0',
  }),
});
