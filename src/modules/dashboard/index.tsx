import React from 'react';

export const dashboardPagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/dashboard',
        component: React.lazy(() => import('./dashboard')),
      },
    ],
  },
];
