import {DashboardActionTypes} from '../../types/actions/Dashboard.action';
import {AppActions} from '../../types/index';
import {FETCH_START, FETCH_SUCCESS} from 'types/actions/Common.action';
import {GET_CRM_DATA} from 'types/actions/Dashboard.action';

import crmData from '../../@crema/services/db/dashboard/crm';
import {Dispatch} from 'redux';

export const onGetCrmData = () => {
  console.log('====================================');
  console.log('onGetCrm호출');
  console.log('====================================');
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({type: FETCH_START});

    //axios-mock-adapter 프로세스 일단 삭제함
    dispatch({type: FETCH_SUCCESS});
    console.log('crmData : ');
    console.log(crmData);
    dispatch({type: GET_CRM_DATA, payload: crmData});
  };
};
