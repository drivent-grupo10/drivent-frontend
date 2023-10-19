import { useEffect, useState } from "react";
import useGetTicket from "../../../hooks/api/useGetTicket";
import useGetHotels from "../../../hooks/api/useGetHotels";
import { styled } from "styled-components";

export default function Hotel() {
  const { ticket } = useGetTicket();
  const [status, setStatus] = useState(0);
  const { hotels } = useGetHotels();

  // const hotels = [
  //   {
  //     id: 1,
  //     name: 'Resort',
  //     image: 'data:image/jpeg;base64,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',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   }
  // ]

  if (ticket && hotels){
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

        {ticket.TicketType.includesHotel === true && ticket.status === 'PAID' &&
          <>
            <SCTitle>Escolha de Hotel e Quarto</SCTitle>
            <SCSubTitle>Primeiro, escolha seu hotel</SCSubTitle>
            <SCContainer>
              {
                hotels.map((h, i) => (
                  <SCContainerHotel>
                    <SCHotelImage src={h.image}/>
                    <SCHotelInfo>{h.name}</SCHotelInfo>
                  </SCContainerHotel>
                ))
              }
            </SCContainer>
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

  font-family: Roboto;
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

  background-color: #ebebeb;
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
