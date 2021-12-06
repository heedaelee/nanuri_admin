export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    messageId: 'sidebar.app.dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/dashboard',
  },
  {
    id: 'user',
    title: 'User',
    messageId: 'sidebar.user',
    type: 'collapse',
    icon: 'dashboard',
    children: [
      {
        id: 'userList',
        title: 'UserList',
        messageId: 'sidebar.user.userList',
        type: 'item',
        url: '/user/userList',
      },
      {
        id: 'userAdd',
        title: 'UserAdd',
        messageId: 'sidebar.user.userAdd',
        type: 'item',
        url: '/user/userAdd',
      },
    ],
  },
];
export default routesConfig;
