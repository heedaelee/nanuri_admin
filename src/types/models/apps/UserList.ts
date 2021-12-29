export interface UserListObj {
  id: number;
  name: string;
  email: string;
  contact: string;
  isStarred: boolean;
  isFrequent: boolean;
  image: string;
  address?: string;
  facebookId?: string;
  twitterId?: string;
  notes?: string;
  birthday?: string;
}
export interface FolderObj {
  id: number;
  name: string;
  alias: string;
  icon: string;
}
