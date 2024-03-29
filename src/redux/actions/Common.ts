import {
  CommonActionTypes,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_APP_DRAWER,
} from '../../types/actions/Common.action';

export const fetchStart = (): CommonActionTypes => ({type: FETCH_START});

export const fetchSuccess = (): CommonActionTypes => ({type: FETCH_SUCCESS});

export const fetchError = (payload: string): CommonActionTypes => ({
  type: FETCH_ERROR,
  payload,
});

export const showMessage = (payload: string): CommonActionTypes => ({
  type: SHOW_MESSAGE,
  payload,
});

export const onToggleAppDrawer = (): CommonActionTypes => ({
  type: TOGGLE_APP_DRAWER,
});

export const hideMessage = (): CommonActionTypes => ({type: HIDE_MESSAGE});
