import {AuthUser} from '../../types/models/AuthUser';
import {AuthType} from './AppEnums';

export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
};

export const defaultUser: AuthUser = {
  uid: 'RFedvhji876rfhjuecvh7',
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: authRole.user,
  authType: AuthType.AUTH0,
  photoURL: '/assets/images/avatar/A11.jpg',
};
//여기가 시작분
export const initialUrl = '/dashboard'; // this url will open after login
