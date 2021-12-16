import React from 'react';
import {Redirect} from 'react-router';

export const userPagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/user/userList',
        component: React.lazy(() => import('./UserList2')),
      },
      {
        path: ['/user/userList/folder/:name', '/user/userList/label/:name'],
        component: React.lazy(() => import('./UserList2')),
      },
      {
        path: '/user/userList',
        component: () => <Redirect to='/user/userList/folder/all' />,
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
