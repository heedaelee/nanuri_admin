import React from 'react';
import {Redirect} from 'react-router';

export const userPagesConfig = [
  {
    auth: ['user'],
    routes: [
      // {
      //   path: '/user/userList',
      //   component: React.lazy(() => import('./UserList_backup')),
      // },
      {
        path: ['/user/userList/folder/:name'],
        component: React.lazy(() => import('./UserList')),
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
