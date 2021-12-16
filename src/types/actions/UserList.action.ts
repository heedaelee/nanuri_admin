// action strings
export const CREATE_NEW_CONTACT = 'CREATE_NEW_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const GET_CONTACT_FOLDER_LIST = 'GET_CONTACT_FOLDER_LIST';
export const GET_CONTACT_LIST = 'GET_CONTACT_LIST';
export const TOGGLE_CONTACT_DRAWER = 'TOGGLE_CONTACT_DRAWER';
export const UPDATE_CONTACT_DETAIL = 'UPDATE_CONTACT_DETAIL';
export const UPDATE_CONTACT_STARRED_STATUS = 'UPDATE_CONTACT_STARRED_STATUS';

export interface CreateNewContact {
  type: typeof CREATE_NEW_CONTACT;
}

export interface DeleteContact {
  type: typeof DELETE_CONTACT;
}

export interface GetContactFolderList {
  type: typeof GET_CONTACT_FOLDER_LIST;
}

export interface GetContactList {
  type: typeof GET_CONTACT_LIST;
}

export interface ToggleContactDrawer {
  type: typeof TOGGLE_CONTACT_DRAWER;
}

export interface UpdateContactDetail {
  type: typeof UPDATE_CONTACT_DETAIL;
}

export interface UpdateContactStarredStatus {
  type: typeof UPDATE_CONTACT_STARRED_STATUS;
  payload: {data: any; folderName: string};
}

export type UserListActionTypes =
  | CreateNewContact
  | DeleteContact
  | GetContactFolderList
  | GetContactList
  | ToggleContactDrawer
  | UpdateContactDetail
  | UpdateContactStarredStatus;
