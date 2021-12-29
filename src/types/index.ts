import {CommonActionTypes} from './actions/Common.action';
import {SettingsActionTypes} from './actions/Settings.action';
import {AuthActions} from './actions/Auth.actions';
import {DashboardActionTypes} from './actions/Dashboard.action';
import {UserListActionTypes} from './actions/UserList.action';

export type AppActions =
  | CommonActionTypes
  | SettingsActionTypes
  | AuthActions
  | DashboardActionTypes
  | UserListActionTypes;
