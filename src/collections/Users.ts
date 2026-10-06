import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'שם מלא',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['admin'],
      options: [
        { label: 'מנהל מערכת (Admin)', value: 'admin' },
        { label: 'עורך תוכן (Editor)', value: 'editor' },
      ],
      label: 'הרשאות',
    },
  ],
};
