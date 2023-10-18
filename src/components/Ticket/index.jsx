import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useGetTicketTypes from '../../hooks/api/useGetTicketTypes';
import OrderSummaryBeforePay from './OrderSummaryBeforePay';

export default function Ticket() {
  const { ticketTypes } = useGetTicketTypes();
  const [isRemote, setIsRemote] = useState(null);
  const [ticketNotRemoteWithHotel, setTicketNotRemoteWithHotel] = useState({});
  const [ticketNotRemoteWithoutHotel, setTicketNotRemoteWithoutHotel] = useState({});
  const [ticketRemote, setTicketRemote] = useState({});
  const [includesHotel, setIncludesHotel] = useState(null);

  useEffect(() => {
    if (ticketTypes) {
      ticketTypes.forEach(ticketType => {
        const { isRemote, includesHotel } = ticketType;

        if (isRemote) {
          setTicketRemote(ticketType);
        } else if (includesHotel) {
          setTicketNotRemoteWithHotel(ticketType);
        } else {
          setTicketNotRemoteWithoutHotel(ticketType);
        }
      });
    }
  }, [ticketTypes]);

  function clickRemoteOrInPerson(booleanClick) {
    if (isRemote === null) {
      setIsRemote(booleanClick);
    } else if (isRemote !== booleanClick) {
      setIsRemote(booleanClick);
      setIncludesHotel(null);
    }
  }

  return (
    <>
      <ContainerTicket>
        <h1>Primeiro, escolha sua modalidade de ingresso</h1>
        <div>
          <BoxTicket onClick={() => clickRemoteOrInPerson(false)} active={isRemote === false}>
            <p>Presencial</p>
            <span>R$ {ticketNotRemoteWithoutHotel.price}</span>
          </BoxTicket>
          <BoxTicket onClick={() => clickRemoteOrInPerson(true)} active={isRemote === true}>
            <p>Online</p>
            <span>R$ {ticketRemote.price}</span>
          </BoxTicket>
        </div>
      </ContainerTicket>

      {isRemote === false &&
        <ContainerTicket>
          <h1>Ótimo! Agora escolha sua modalidade de hospedagem</h1>
          <div>
            <BoxTicket onClick={() => setIncludesHotel(false)} active={includesHotel === false}>
              <p>Sem Hotel</p>
              <span>+ R$ 0</span>
            </BoxTicket>
            <BoxTicket onClick={() => setIncludesHotel(true)} active={includesHotel === true}>
              <p>Com Hotel</p>
              <span>+ R$ {ticketNotRemoteWithHotel.price - ticketNotRemoteWithoutHotel.price}</span>
            </BoxTicket>
          </div>
        </ContainerTicket>
      }

      {isRemote === true &&
        <OrderSummaryBeforePay price={ticketRemote.price} id={ticketRemote.id}/>
      }

      {includesHotel === false &&
        <OrderSummaryBeforePay price={ticketNotRemoteWithoutHotel.price} id={ticketNotRemoteWithoutHotel.id}/>
      }

      {includesHotel === true &&
        <OrderSummaryBeforePay price={ticketNotRemoteWithHotel.price} id={ticketNotRemoteWithHotel.id}/>
      }
    </>
  );
}

const ContainerTicket = styled.div`
  color: #8E8E8E;
  div {
    margin: 10px 30px 20px 0;
    display: flex;
  }
`;

const BoxTicket = styled.div`
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: ${props => (props.active ? 'none' : '1px solid #CECECE')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: #454545;
    margin-bottom: 5px;
  }
  background-color: ${props => (props.active ? '#FFEED2' : 'white')};
`;