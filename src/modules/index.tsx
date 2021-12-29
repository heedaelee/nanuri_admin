import React from 'react';
import {Redirect} from 'react-router-dom';

import {createRoutes} from '../@crema/utility/Utils';
import {userPagesConfig} from './user';
import {errorPagesConfigs} from './errorPages';
import {authRouteConfig} from './auth';
import {productPagesConfig} from './product';
import {initialUrl} from '../shared/constants/AppConst';

import {dashboardPagesConfig} from './dashboard';
const routeConfigs = [
  ...dashboardPagesConfig,
  ...userPagesConfig,
  ...errorPagesConfigs,
  ...authRouteConfig,
  ...productPagesConfig,
];

const routes = [
  ...createRoutes(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to={initialUrl} />,
  },
  {
    component: () => <Redirect to='/error-pages/error-404' />,
  },
];

export default routes;
