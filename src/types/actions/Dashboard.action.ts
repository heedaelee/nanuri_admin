// action strings
export const GET_CRM_DATA = 'GET_CRM_DATA';

export interface GetCrmDataAction {
  type: typeof GET_CRM_DATA;
  payload: {
    quickStatsData: {
      clientsData: quickStatsDataParam;
      invoiceData: quickStatsDataParam;
      totalProjectsData: quickStatsDataParam;
      openProjectsData: quickStatsDataParam;
    };
    statisticsGraph: {
      projectData: statisticsParam[];
      clientsData: statisticsParam[];
      incomeData: statisticsParam[];
    };
    ticketSupportData: Array<ticketSupportDataParam>;
    todayTaskData: Array<todayTaskDataParam>;
    websiteTrafficData: Array<websiteTrafficDataParam>;
    // 이렇게 해도 됨 배열에선
    // websiteTrafficData: websiteTrafficDataParam[];
  };
}
interface quickStatsDataParam {
  count: string;
}

interface websiteTrafficDataParam {
  month: string;
  users: number;
}
interface todayTaskDataParam {
  id: number | string;
  task: string;
  date: string;
  isChecked: boolean;
}
interface ticketSupportDataParam {
  id: number | string;
  name: string;
  _email: string;
  created: string;
  contact: string;
  image: string;
}
interface statisticsParam {
  month: string;
  number: number;
}

export type DashboardActionTypes = GetCrmDataAction;
