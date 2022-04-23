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
    type: 'item',
    icon: 'dashboard',
    url: '/user/userList',
  },
  {
    id: 'product',
    title: 'Product',
    messageId: 'sidebar.product',
    type: 'item',
    icon: 'dashboard',
    url: '/product',
  },
];
export default routesConfig;
