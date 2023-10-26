import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';

export default function useGetActivityByPlace(date) {
  const token = useToken();

  const {
    data: activityofplace,
    loading: activityLoading,
    error: activityError,
    act: getActivitiesPlace
  } = useAsync(() => activitiesApi.getActivitiesByPlace(token, date), false);

  return {
    activityofplace,
    activityLoading,
    activityError,
    getActivitiesPlace
  };
}
