import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useUpdateBooking() {
  const token = useToken();
  
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: updateBooking
  } = useAsync((data) => bookingApi.updateBooking(data, token), false);

  return {
    booking,
    bookingLoading,
    bookingError,
    updateBooking
  };
}