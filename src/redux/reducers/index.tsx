import Settings from './Setting';
import CommonReducer from './CommonReducer';
import Auth from './Auth';
import Dashboard from './Dashboard';
import UserListReducer from './UserList';

//루트 리듀서
const reducers = {
  settings: Settings,
  auth: Auth,
  common: CommonReducer,
  dashboard: Dashboard,
  userList: UserListReducer,
};

export default reducers;
