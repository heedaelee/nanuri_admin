import React from 'react';
import Api from '../../@crema/services/ApiConfig';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_CRM_DATA,
} from '../../shared/constants/ActionTypes';
import IntlMessages from '../../@crema/utility/IntlMessages';
import crmData from '../../@crema/services/db/dashboard/crm';

export const onGetCrmData = () => {
  console.log('====================================');
  console.log('onGetCrm호출');
  console.log('====================================');
  return (dispatch) => {
    dispatch({type: FETCH_START});
    dispatch({type: FETCH_SUCCESS});
    console.log('crmData : ');
    console.log(crmData);
    dispatch({type: GET_CRM_DATA, payload: crmData});
  };
};
