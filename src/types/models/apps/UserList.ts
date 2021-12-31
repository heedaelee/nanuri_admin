export interface UserListObj {
  id: number;
  name: string;
  email: string;
  contact: string;
  isStarred: boolean;
  image: string;
  address?: string;
  appleId?: string;
  kakaoId?: string;
  notes?: string;
  birthday?: string;
}
export interface FolderObj {
  id: number;
  name: string;
  alias: string;
  icon: string;
}
