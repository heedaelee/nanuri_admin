import Settings from './Setting';
import CommonReducer from './CommonReducer';
import Auth from './Auth';
import Dashboard from './Dashboard';

const reducers = {
  settings: Settings,
  auth: Auth,
  common: CommonReducer,
  dashboard: Dashboard,
};

export default reducers;
