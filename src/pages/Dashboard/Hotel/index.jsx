import { useEffect, useState } from "react";
import useGetTicket from "../../../hooks/api/useGetTicket";
import useGetHotels from "../../../hooks/api/useGetHotels";
import { styled } from "styled-components";
import useGetHotelWithRooms from "../../../hooks/api/useGetHotelsWithRooms";
import { BsPerson } from 'react-icons/bs'
import useToken from "../../../hooks/useToken";
import { getHotels } from "../../../services/hotelApi";
import api from '../../../services/api';

export default function Hotel() {
  const { ticket } = useGetTicket();
  const [selectedHotel, setSelectedHotel] = useState(0);
  const { hotels } = useGetHotels();
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [ indexOfHotel, setIndexOfHotel ] = useState(-1)

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

  function selectHotel(i){
    const hotelId = hotelsWithRooms[i].id
    setIndexOfHotel(i)
    setSelectedHotel(hotelId)
  }

  function verifyRoomTypes(Rooms) {
    let single = false
    let double = false
    let triple = false

    for (let i = 0; i < Rooms.length; i++){
      if (Rooms[i].capacity === 1){
        single = true;
      }
      if (Rooms[i].capacity === 2){
        double = true;
      }
      if (Rooms[i].capacity === 1){
        triple = true;
      }
    }

    if (single === true && double === false && triple === false){
      return 'Single'
    }else if (single === false && double === true && triple === false){
      return 'Double'
    }else if (single === false && double === false && triple === true){
      return 'Triple'
    }else if (single === true && double === true && triple === false){
      return 'Single e Double'
    }else if (single === true && double === false && triple === true){
      return 'Single e Triple'
    }else if (single === false && double === true && triple === true){
      return 'Double e Triple'
    }if (single === true && double === true && triple === true){
      return 'Single, Double e Triple'
    }
  }

  function countRooms(Rooms) {
    let sum = 0

    for (let i = 0; i < Rooms.length; i++){
      sum += Rooms[i].capacity
    }

    return sum
  }

  if (ticket){
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
                    <SCHotelImage src={h.image}/>
                    <SCHotelInfo>
                      {h.name}
                      <SCStrongText>Tipos de acomodação:</SCStrongText>
                      <SCText>{verifyRoomTypes(h.Rooms)}</SCText>
                      <SCStrongText>Vagas Disponíveis:</SCStrongText>
                      <SCText>{countRooms(h.Rooms)}</SCText>
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
                <SCRoom key={i}>
                  <SCRoomNumber>{r.name}</SCRoomNumber>
                  {r.capacity === 1 &&
                    <SCContainerPersonIcon>
                      <SCPersonIcon />
                    </SCContainerPersonIcon>}
                  {r.capacity === 2 &&
                    <SCContainerPersonIcon>
                      <SCPersonIcon />
                      <SCPersonIcon />
                    </SCContainerPersonIcon>}
                  {r.capacity === 3 &&
                    <SCContainerPersonIcon>
                      <SCPersonIcon />
                      <SCPersonIcon />
                      <SCPersonIcon />
                    </SCContainerPersonIcon>}
                </SCRoom>
              ))}
            </SCContainerRooms>
          </>
        }
    </>
  );
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

const SCRoom = styled.div`
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
`

const SCRoomNumber = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;

  color: #454545;
`

const SCContainerPersonIcon = styled.div`
  display: flex;
  justify-content: space-between;
`

const SCPersonIcon = styled(BsPerson)`
  width: 27px;
  height: 27px;
`
