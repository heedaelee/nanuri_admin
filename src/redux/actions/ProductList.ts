import {AppActions} from '../../types/index';
import {Dispatch} from 'redux';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SHOW_MESSAGE,
} from '../../types/actions/Common.action';
import {
  ProductListActionTypes,
  CREATE_NEW_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_FOLDER_LIST,
  GET_PRODUCT_LIST,
  TOGGLE_PRODUCT_DRAWER,
  UPDATE_PRODUCT_DETAIL,
  UPDATE_PRODUCT_STARRED_STATUS,
} from '../../types/actions/ProductList.action';
import Api from '../../@crema/services/ApiConfig';
import {appIntl} from '../../@crema/utility/Utils';

/* 경로설명: 
api호출은 src/@crema/services/apis ... 로 호출한다
*/

//onGetContactList ->
export const onGetProductList = (
  type: string,
  name: string,
  currentPage: number,
) => {
  const {messages} = appIntl();
  const page = currentPage ? currentPage : 0;
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.get('/api/product/List', {
      params: {
        type: type,
        name: name,
        page: page,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_PRODUCT_LIST, payload: data.data});
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
    Api.get('/api/product/folders/list')
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: GET_PRODUCT_FOLDER_LIST, payload: data.data});
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

//onToggleContactDrawer to->
export const onToggleProductDrawer = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: TOGGLE_PRODUCT_DRAWER});
  };
};

export const onUpdateStarredStatus = (
  contactIds: string[],
  status: boolean,
  folderName: string,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.put('/api/product/update/starred', {contactIds, status})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({
            type: UPDATE_PRODUCT_STARRED_STATUS,
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

export const onDeleteProducts = (
  type: string,
  name: string,
  contactIds: string[],
  page: number,
) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.post('/api/product/delete/contact', {type, name, contactIds, page})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_PRODUCT, payload: data.data});
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

export const onUpdateSelectedProduct = (contact: any) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.put('/api/product/', {contact})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_PRODUCT_DETAIL, payload: data.data});
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

export const onCreateProduct = (contact: any) => {
  const {messages} = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});
    Api.post('/api/product/compose', {contact})
      .then((data) => {
        if (data.status === 200) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: CREATE_NEW_PRODUCT, payload: data.data});
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
