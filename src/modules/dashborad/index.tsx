import React from 'react';

export const dashboardsConfigs = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/dashboards',
        component: React.lazy(() => import('./CRM')),
      },
    ],
  },
];
