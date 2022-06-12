import {ADMIN_TYPE} from './AdminType';

export const getAdminAnalyticsData = () => {
  return {
    type: ADMIN_TYPE.GET_ADMIN_ANALYTICS_DATA,
  };
};

export const updateAnalyticsData = payload => {
  return {
    type: ADMIN_TYPE.UPDATE_ANALYTICS_DATA,
    payload,
  };
};
