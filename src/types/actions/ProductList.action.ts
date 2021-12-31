import {ProductListObj, FolderObj} from '../models/apps/ProductList';

// action strings
export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_PRODUCT_FOLDER_LIST = 'GET_PRODUCT_FOLDER_LIST';
export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const UPDATE_PRODUCT_STARRED_STATUS = 'UPDATE_PRODUCT_STARRED_STATUS';
export const UPDATE_PRODUCT_DETAIL = 'UPDATE_PRODUCT_DETAIL';
export const TOGGLE_PRODUCT_DRAWER = 'TOGGLE_PRODUCT_DRAWER';

export interface CreateProductActions {
  type: typeof CREATE_NEW_PRODUCT;
  payload: ProductListObj;
}

export interface DeleteProductActions {
  type: typeof DELETE_PRODUCT;
  payload: {list: ProductListObj[]; total: number};
}

export interface GetProductFolderActions {
  type: typeof GET_PRODUCT_FOLDER_LIST;
  payload: FolderObj[];
}

export interface GetProductsActions {
  type: typeof GET_PRODUCT_LIST;
  payload: {list: ProductListObj[]; total: number};
}

export interface ToggleProductDrawerActions {
  type: typeof TOGGLE_PRODUCT_DRAWER;
}

export interface UpdateProductActions {
  type: typeof UPDATE_PRODUCT_DETAIL;
  payload: ProductListObj;
}

export interface UpdateProductStarActions {
  type: typeof UPDATE_PRODUCT_STARRED_STATUS;
  payload: {data: ProductListObj[]; folderName: string};
}

export type ProductListActionTypes =
  | CreateProductActions
  | DeleteProductActions
  | GetProductFolderActions
  | GetProductsActions
  | ToggleProductDrawerActions
  | UpdateProductActions
  | UpdateProductStarActions;
