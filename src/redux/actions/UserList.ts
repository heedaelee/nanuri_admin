import { Dispatch } from 'redux';
import Api from '../../@crema/services/ApiConfig';
import { appIntl } from '../../@crema/utility/Utils';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE
} from '../../types/actions/Common.action';
import {
  CREATE_NEW_CONTACT,
  DELETE_CONTACT,
  GET_CONTACT_FOLDER_LIST,
  GET_CONTACT_LIST,
  TOGGLE_CONTACT_DRAWER,
  UPDATE_CONTACT_DETAIL,
  UPDATE_CONTACT_STARRED_STATUS
} from '../../types/actions/UserList.action';
import { AppActions } from '../../types/index';

export const onGetContactList = (
  type: string,
  name: string,
  currentPage: number,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.get('/api/contactApp/contact/List', {
      params: {
        type: type,
        name: name,
        page: page,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CONTACT_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onGetFolderList = () => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.get('/api/contactApp/folders/list')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_CONTACT_FOLDER_LIST, payload: data.data});
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onToggleContactDrawer = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: TOGGLE_CONTACT_DRAWER});
  };
};

export const onUpdateStarredStatus = (
  contactIds: number[],
  status: boolean,
  folderName: string,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.put('/api/contactApp/update/starred', {contactIds, status})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_CONTACT_STARRED_STATUS,
            payload: {data: data.data, folderName: folderName},
          });
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.starredStatus'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onDeleteContacts = (
  type: string,
  name: string,
  contactIds: number[],
  page: number,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.post('/api/contactApp/delete/contact', {type, name, contactIds, page})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_CONTACT, payload: data.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.contactDeleted'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onUpdateSelectedContact = (contact: any) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.put('/api/contactApp/contact/', {contact})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_CONTACT_DETAIL, payload: data.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.contactUpdated'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};

export const onCreateContact = (contact: any) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.post('/api/contactApp/compose', {contact})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: CREATE_NEW_CONTACT, payload: data.data});
          dispatch({
            type: SHOW_MESSAGE,
            payload: messages['message.contactCreated'],
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: messages['message.somethingWentWrong'],
          });
        }
      })
      .catch((error) => {
        dispatch({type: FETCH_ERROR, payload: error.message});
      });
  };
};
