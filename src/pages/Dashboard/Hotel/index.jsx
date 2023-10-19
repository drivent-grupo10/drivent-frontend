import { useEffect, useState } from "react";
import useGetTicket from "../../../hooks/api/useGetTicket";
import useGetHotels from "../../../hooks/api/useGetHotels";
import { styled } from "styled-components";

export default function Hotel() {
  const { ticket } = useGetTicket();
  const [status, setStatus] = useState(0);
  const { hotels } = useGetHotels();

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
