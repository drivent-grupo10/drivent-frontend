import { useEffect, useState } from "react";
import useGetTicket from "../../../hooks/api/useGetTicket";
import useGetHotels from "../../../hooks/api/useGetHotels";
import { styled } from "styled-components";
import useGetHotelWithRooms from "../../../hooks/api/useGetHotelsWithRooms";
import { BsPerson } from 'react-icons/bs'
import { BsPersonFill } from 'react-icons/bs'
import useToken from "../../../hooks/useToken";
import { getHotels } from "../../../services/hotelApi";
import api from '../../../services/api';
import useCreateBooking from "../../../hooks/api/useCreateBooking";
import { toast } from "react-toastify";
import useGetBooking from "../../../hooks/api/useGetBooking";
import { updateBooking } from "../../../services/bookingApi";

export default function Hotel() {
  const { ticket } = useGetTicket();
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const { hotels } = useGetHotels();
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [indexOfHotel, setIndexOfHotel] = useState(-1);
  const [indexOfRoom, setIndexOfRoom] = useState(-1);
  const { booking } = useGetBooking();
  const { createBooking } = useCreateBooking();
  const [ changing, setChanging ] = useState(false);

  console.log(booking)

  const arr = []

  const token = useToken();

  async function getHotel() {
    try {
      for (const hotel of hotels) {
        const response = await api.get(`/hotels/${hotel.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        arr.push(response.data)
      }
      setHotelsWithRooms(arr)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    if (hotels) {
      getHotel();
    }
  }, [hotels])

  function selectHotel(i) {
    const hotelId = hotelsWithRooms[i].id
    setIndexOfHotel(i)
    setSelectedHotel(hotelId)
    setSelectedRoom(0)
  }

  function selectRoom(i) {
    const roomId = hotelsWithRooms[indexOfHotel].Rooms[i].id
    setIndexOfRoom(i)
    setSelectedRoom(roomId)
  }

  function verifyRoomTypes(Rooms) {
    let single = false
    let double = false
    let triple = false

    for (let i = 0; i < Rooms.length; i++) {
      if (Rooms[i].capacity === 1) {
        single = true;
      }
      if (Rooms[i].capacity === 2) {
        double = true;
      }
      if (Rooms[i].capacity === 1) {
        triple = true;
      }
    }

    if (single === true && double === false && triple === false) {
      return 'Single'
    } else if (single === false && double === true && triple === false) {
      return 'Double'
    } else if (single === false && double === false && triple === true) {
      return 'Triple'
    } else if (single === true && double === true && triple === false) {
      return 'Single e Double'
    } else if (single === true && double === false && triple === true) {
      return 'Single e Triple'
    } else if (single === false && double === true && triple === true) {
      return 'Double e Triple'
    } if (single === true && double === true && triple === true) {
      return 'Single, Double e Triple'
    }
  }

  function countRooms(Rooms, i) {
    let total = 0
    let occupied = 0

    for (let j = 0; j < Rooms.length; j++) {
      total += Rooms[j].capacity
      occupied += Rooms[j].Booking.length
    }

    const sum = total - occupied

    return sum
  }

  async function bookRoom(roomId) {
    if (changing === true) {
      try {
        const body = { roomId }
        await api.put(`/booking/${booking.id}}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast('Reserva atualizada com sucesso!');
        setTimeout(() => {
          setChanging(false)
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast('Não foi possível atualizar a Reserva! ');
        console.log(err)
      }
    }else {
      try {
        const body = { roomId }
        await createBooking(body);
        toast('Reserva realizada com sucesso!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast('Não foi possível fazer a Reserva! ');
        console.log(err)
      }
    }
  }

  function changeRoom(){
    setChanging(true)
  }

  if (ticket && booking === null || changing === true) {
    return (
      <>
        {ticket.status !== 'PAID' &&
          <>
            <SCTitle>Escolha de Hotel e Quarto</SCTitle>
            <SCContainerError>
              <SCError>Você precisa ter confirmado pagamento antes</SCError>
              <SCError>de fazer a escolha de hospedagem</SCError>
            </SCContainerError>
          </>
        }

        {ticket.TicketType.includesHotel === false && ticket.status === 'PAID' &&
          <>
            <SCTitle>Escolha de Hotel e Quarto</SCTitle>
            <SCContainerError>
              <SCError>Sua modalidade de ingresso não inclui hospedagem</SCError>
              <SCError>Prossiga para a escolha de atividades</SCError>
            </SCContainerError>
          </>
        }

        {hotels && ticket.TicketType.includesHotel === true && ticket.status === 'PAID' &&
          <>
            <SCTitle>Escolha de Hotel e Quarto</SCTitle>
            <SCSubTitle>Primeiro, escolha seu hotel</SCSubTitle>
            <SCContainer>
              {
                hotelsWithRooms.map((h, i) => (
                  <SCContainerHotel key={i} onClick={() => selectHotel(i)} selected={selectedHotel === h.id}>
                    <SCHotelImage src={h.image} />
                    <SCHotelInfo>
                      {h.name}
                      <SCStrongText>Tipos de acomodação:</SCStrongText>
                      <SCText>{verifyRoomTypes(h.Rooms)}</SCText>
                      <SCStrongText>Vagas Disponíveis:</SCStrongText>
                      <SCText>{countRooms(h.Rooms, i)}</SCText>
                    </SCHotelInfo>
                  </SCContainerHotel>
                ))
              }
            </SCContainer>
          </>
        }

        {selectedHotel !== 0 &&
          <>
            <SCSubTitle>Ótima pedida! Agora escolha seu quarto:</SCSubTitle>
            <SCContainerRooms>
              {hotelsWithRooms[indexOfHotel].Rooms.map((r, i) => (
                <SCRoom
                  key={i}
                  disabled={hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === r.capacity}
                  onClick={() => selectRoom(i)}
                  selected={selectedRoom === r.id}
                >
                  <SCRoomNumber full={(hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === r.capacity).toString()}>{r.name}</SCRoomNumber>
                  {r.capacity === 1 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 1 &&
                    <SCContainerPersonIcon>
                      <SCOccupiedRoom />
                    </SCContainerPersonIcon>}
                    {r.capacity === 1 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 0 &&
                    <SCContainerPersonIcon>
                      {selectedRoom === r.id ? <SCSeletedRoom /> : <SCFreeRoom />}
                    </SCContainerPersonIcon>}
                  {r.capacity === 2 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 2 &&
                    <SCContainerPersonIcon>
                      <SCOccupiedRoom />
                      <SCOccupiedRoom />
                    </SCContainerPersonIcon>}
                  {r.capacity === 2 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 1 &&
                    <SCContainerPersonIcon>
                      {selectedRoom === r.id ? <SCSeletedRoom /> : <SCFreeRoom />}
                      <SCOccupiedRoom />
                    </SCContainerPersonIcon>}
                  {r.capacity === 2 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 0 &&
                    <SCContainerPersonIcon>
                      <SCFreeRoom />
                      {selectedRoom === r.id ? <SCSeletedRoom /> : <SCFreeRoom />}
                    </SCContainerPersonIcon>}
                  {r.capacity === 3 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 3 &&
                    <SCContainerPersonIcon>
                      <SCOccupiedRoom />
                      <SCOccupiedRoom />
                      <SCOccupiedRoom />
                    </SCContainerPersonIcon>}
                  {r.capacity === 3 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 2 &&
                    <SCContainerPersonIcon>
                      {selectedRoom === r.id ? <SCSeletedRoom /> : <SCFreeRoom />}
                      <SCOccupiedRoom />
                      <SCOccupiedRoom />
                    </SCContainerPersonIcon>}
                  {r.capacity === 3 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 1 &&
                    <SCContainerPersonIcon>
                      <SCFreeRoom />
                      {selectedRoom === r.id ? <SCSeletedRoom /> : <SCFreeRoom />}
                      <SCOccupiedRoom />
                    </SCContainerPersonIcon>}
                  {r.capacity === 3 && hotelsWithRooms[indexOfHotel].Rooms[i].Booking.length === 0 &&
                    <SCContainerPersonIcon>
                      <SCFreeRoom />
                      <SCFreeRoom />
                      {selectedRoom === r.id ? <SCSeletedRoom /> : <SCFreeRoom />}
                    </SCContainerPersonIcon>}
                </SCRoom>
              ))}
            </SCContainerRooms>
            <SCBookRoom onClick={() => bookRoom(selectedRoom)} selected={selectedRoom !== 0}>
              Reservar Quarto
            </SCBookRoom>
          </>
        }
      </>
    );
  }

  if (booking !== null && changing === false) {
    return (
      <>
        <SCTitle>Escolha de Hotel e Quarto</SCTitle>
        <SCSubTitle>Você já escolheu seu quarto:</SCSubTitle>
        <SCContainer>
          <SCContainerHotel>
            <SCHotelImage src={booking.Room.Hotel.image} />
            <SCHotelInfo>
              {booking.Room.Hotel.name}
              <SCStrongText>Quarto Reservado</SCStrongText>
              <SCText>{booking.Room.name} ({booking.Room.capacity === 3 ? 'Triple' : booking.Room.capacity === 2 ? 'Double' : 'Single'})</SCText>
              <SCStrongText>Pessoas no seu quarto</SCStrongText>
              <SCText>{booking.Room.Booking.length === 2 ? 'Você e mais 2' : booking.Room.Booking.length === 1 ? 'Você e mais 1' : 'Somente você'}</SCText>
            </SCHotelInfo>
          </SCContainerHotel>
        </SCContainer>
        <SCCHangeRoom onClick={() => changeRoom()}>
          TROCAR DE QUARTO
        </SCCHangeRoom>
      </>
    )
  }
}

const SCTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  
  color: #000000;
`

const SCContainerError = styled.div`
  width: 500px;
  height: 100px;

  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 250px);
`

const SCError = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;

  color: #8e8e8e;
`

const SCSubTitle = styled.p`
  margin-top: 36px;

  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;

  color: #8e8e8e;
`

const SCContainer = styled.div`
  width: 100%;

  margin-top: 18px;

  display: flex;
  flex-wrap: wrap;
`

const SCContainerHotel = styled.div`
  width: 196px;
  height: 264px;

  margin-right: 19px;

  border: none;
  border-radius: 10px;

  padding: 16px 14px 16px 14px;

  background-color: ${props => props.selected ? '#FFEED2' : '#ebebeb'};

  cursor: pointer;
`

const SCHotelImage = styled.img`
  width: 168px;
  height: 109px;

  border: none;
  border-radius: 5px;
`

const SCHotelInfo = styled.div`
  margin-top: 10px;
`

const SCStrongText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;

  color: #3c3c3c;

  margin-top: 12px;

`

const SCText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;

  color: #3c3c3c;

  margin-top: 2px;
`

const SCContainerRooms = styled.div`
  margin-top: 33px;

  display: flex;
  flex-wrap: wrap;
`

const SCRoom = styled.button`
  width: 190px;
  height: 45px;

  margin-right: 17px;
  margin-top: 8px;

  border: 1px solid #cecece;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 9px 0 16px;

  cursor: pointer;

  background-color: ${props => props.selected ? '#FFEED2' : '#ebebeb'};
`

const SCRoomNumber = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;

  color: ${props => props.full === 'true' ? '#9D9D9D' : '#454545'};
`

const SCContainerPersonIcon = styled.div`
  display: flex;
  justify-content: space-between;
`

const SCFreeRoom = styled(BsPerson)`
  width: 27px;
  height: 27px;
`

const SCOccupiedRoom = styled(BsPersonFill)`
  width: 27px;
  height: 27px;
`

const SCSeletedRoom = styled(BsPersonFill)`
  width: 27px;
  height: 27px;

  color: #e75480;
`

const SCBookRoom = styled.div`
  width: 182px;
  height: 37px;

  border: none;
  border-radius: 4px;

  background-color: #E0E0E0;

  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;

  color: #000000;

  display: ${props => props.selected ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;

  margin-top: 46px;

  cursor: pointer;
`

const SCCHangeRoom = styled.div`
  width: 182px;
  height: 37px;

  border: none;
  border-radius: 4px;

  background-color: #E0E0E0;

  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;

  color: #000000;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 46px;

  cursor: pointer;
`
