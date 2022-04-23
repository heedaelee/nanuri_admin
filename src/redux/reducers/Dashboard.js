import {
  // GET_ACADEMY_DATA,
  // GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  // GET_CRYPTO_DATA,
  // GET_ECOMMERCE_DATA,
  // GET_HC_DATA,
  // GET_METRICS_DATA,
  // GET_WIDGETS_DATA,
} from '../../types/actions/Dashboard.action';

const initialState = {
  crmData: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_ANALYTICS_DATA:
    //   return {
    //     ...state,
    //     analyticsData: action.payload,
    //   };

    // case GET_ECOMMERCE_DATA:
    //   return {
    //     ...state,
    //     ecommerceData: action.payload,
    //   };

    // case GET_ACADEMY_DATA:
    //   return {
    //     ...state,
    //     academyData: action.payload,
    //   };

    case GET_CRM_DATA:
      return {
        ...state,
        crmData: action.payload,
      };

    default:
      return state;
  }
};
export default dashboardReducer;
