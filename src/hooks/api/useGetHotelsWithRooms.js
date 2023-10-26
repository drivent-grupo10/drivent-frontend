import * as hotelApi from '../../services/hotelApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useGetHotelWithRooms(id) {
  const token = useToken();

  const {
    data: hotelsWithRooms,
    loading: hotelWithRoomsLoading,
    error: hotelWithRoomsError,
    act: getHotelsWithRooms
  } = useAsync(() => hotelApi.getHotelWithRooms(token, id));

  return {
    hotelsWithRooms,
    hotelWithRoomsLoading,
    hotelWithRoomsError,
    getHotelsWithRooms
  };
}