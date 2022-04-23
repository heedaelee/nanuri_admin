import {UserListObj, FolderObj} from '../models/apps/UserList';

// action strings
export const CREATE_NEW_CONTACT = 'CREATE_NEW_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const GET_CONTACT_FOLDER_LIST = 'GET_CONTACT_FOLDER_LIST';
export const GET_CONTACT_LIST = 'GET_CONTACT_LIST';
export const UPDATE_CONTACT_STARRED_STATUS = 'UPDATE_CONTACT_STARRED_STATUS';
export const UPDATE_CONTACT_DETAIL = 'UPDATE_CONTACT_DETAIL';
export const UPDATE_CONTACT_LABEL = 'UPDATE_CONTACT_LABEL';
export const TOGGLE_CONTACT_DRAWER = 'TOGGLE_CONTACT_DRAWER';

export interface CreateContactActions {
  type: typeof CREATE_NEW_CONTACT;
  payload: UserListObj;
}

export interface DeleteContactActions {
  type: typeof DELETE_CONTACT;
  payload: {list: UserListObj[]; total: number};
}

export interface GetContactFolderActions {
  type: typeof GET_CONTACT_FOLDER_LIST;
  payload: FolderObj[];
}

export interface GetContactsActions {
  type: typeof GET_CONTACT_LIST;
  payload: {list: UserListObj[]; total: number};
}

export interface ToggleContactDrawerActions {
  type: typeof TOGGLE_CONTACT_DRAWER;
}

export interface UpdateContactActions {
  type: typeof UPDATE_CONTACT_DETAIL;
  payload: UserListObj;
}

export interface UpdateContactLabelActions {
  type: typeof UPDATE_CONTACT_LABEL;
  payload: {data: UserListObj[]; labelName: string; labelType: number};
}

export interface UpdateContactStarActions {
  type: typeof UPDATE_CONTACT_STARRED_STATUS;
  payload: {data: UserListObj[]; folderName: string};
}

export type UserListActionTypes =
  | CreateContactActions
  | DeleteContactActions
  | GetContactFolderActions
  | GetContactsActions
  | ToggleContactDrawerActions
  | UpdateContactActions
  | UpdateContactStarActions
  | UpdateContactLabelActions;
