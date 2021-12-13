import React from 'react';

export const userPagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/user/userList',
        component: React.lazy(() => import('./Pages/UserList')),
      },
    ],
  },
  // {
  //   auth: ['user'],
  //   routes: [
  //     {
  //       path: '/user/userAdd',
  //       component: React.lazy(() => import('./Pages/PageTwo')),
  //     },
  //   ],
  // },
];
