import React from 'react';

export const samplePagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/user/userList',
        component: React.lazy(() => import('./Pages/PageOne')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/user/userAdd',
        component: React.lazy(() => import('./Pages/PageTwo')),
      },
    ],
  },
];
