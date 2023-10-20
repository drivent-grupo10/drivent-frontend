import styled from 'styled-components';
import { useState } from 'react';
import CreditCard from './CreditCard';
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSummaryAfterPay({ ticket }) {
  const [confirmed, setConfirmed] = useState(ticket?.status === 'PAID' ? true : false);

  return (
    <>
      <ContainerOrderSummaryAfterPay>
        <h3>Ingresso Escolhido</h3>
        <DivSummary>
          <h4>
            {ticket.TicketType.isRemote ? 'Online' : 'Presencial'} + 
            {ticket.TicketType.includesHotel ? ' Com hotel' : ' Sem hotel'}
          </h4>
          <p>R$ {ticket.TicketType.price}</p>
        </DivSummary>
        <h3>Pagamento</h3>
        {confirmed ?
          <PaymentConfirmed>
            <FaCheckCircle color='#36b853' size={30} />
            <p>
              <strong>Pagamento confirmado!</strong>
              <br />Prossiga para escolha de hospedagem e atividades
            </p>
          </PaymentConfirmed>
          :
          <CreditCard ticketId={ticket.id} />
        }

      </ContainerOrderSummaryAfterPay>
    </>
  );
}

const ContainerOrderSummaryAfterPay = styled.div`
    color: #8E8E8E;
    font-family: "Roboto";
    font-size: 20px;
    font-weight: 400;
    line-height: 23.44px;
`;

const DivSummary = styled.div`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  margin: 17px 0px;
  background: #FFEED2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    font-size: 16px;
    line-height: 18.75px;
    color: #454545;
    margin-bottom: 7px;
  }

  p {
    font-size: 14px;
    line-height: 16.75px;
    color: #898989
  }
`;

const PaymentConfirmed = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  p {
    font-size: 16px;
    line-height: 16px;
  }
`