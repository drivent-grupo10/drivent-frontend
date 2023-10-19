import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useGetHotels() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelLoading,
    error: hotelError,
    act: getHotels
  } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    hotelLoading,
    hotelError,
    getHotels
  };
}