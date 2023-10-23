import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useGetBooking() {
    const token = useToken();

  const {
    data: bookings,
    loading: bookingsLoading,
    error: bookingsError,
    act: getBookings
  } = useAsync(() => bookingApi.getBooking(token));

  return {
    bookings,
    bookingsLoading,
    bookingsError,
    getBookings
  };
}