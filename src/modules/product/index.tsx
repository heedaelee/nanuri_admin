import React from 'react';
import {Redirect} from 'react-router';

export const productPagesConfig = [
  {
    auth: ['user'],
    routes: [
      {
        path: ['/product/folder/:name'],
        component: React.lazy(() => import('./ProductList')),
      },
      {
        path: '/product',
        component: () => <Redirect to='/product/folder/all' />,
      },
    ],
  },
];
