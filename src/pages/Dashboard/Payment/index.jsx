import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useToken from '../../../hooks/useToken';
import { useState } from 'react';
import axios from 'axios';

export default function Payment() {

  const { enrollment } = useEnrollment();
  const token = useToken();
  const [ticketType, setTicketType] = useState('');

  async function chooseOption() {
    // try {
    //   const response = await axios.get(
    //     'http://localhost:4000/tickets/types',
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       }
    //     }
    //   );

    //   console.log(response)

    //   const result = await axios.post(
    //     'http://localhost:4000/tickets', { ticketTypeId: response. ?? },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       }
    //     }
    //   );
    //     console.log(result)
    //   return result.data;
    // }
    // catch (error) {
    //   throw error;
    // }
  };

  return (
    <Container>
      <h1> Ingresso e pagamento</h1>

      <div>
        {enrollment ? (
          <TicketsContainer>
            <TicketsAvailable>
              <div
                style={{ backgroundColor: ticketType === 'Presencial' ? '#FFEED2' : '' }}
                onClick={() => setTicketType('Presencial')}
              >
                <h1>Presencial</h1>
                <p>R$250</p>
              </div>
              <div
                style={{ backgroundColor: ticketType === 'Online' ? '#FFEED2' : '' }}
                onClick={() => setTicketType('Online')}
              >
                <h1>Online</h1>
                <p>R$100</p>
              </div>
            </TicketsAvailable>
          </TicketsContainer>
        ) : (
          <NoEnrollment>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</NoEnrollment>
        )}
      </div>

      {ticketType === 'Online' ? (
        <ConfimationHeadline>
          <h2>
            Fechado! O total ficou em <strong>R$ 100</strong>. Agora é só confirmar:
          </h2>
          <button
            onClick={async () => {
              await chooseOption();
              setTicketType('');
              window.location.reload();
            }}
          >
            RESERVAR INGRESSO
          </button>
        </ConfimationHeadline>
      ) : (
        ''
      )}

      
    </Container>
  )
}

const Container = styled.div`
  h1 {
    font-size: 34px;
  }
  height: 100%;
`;

const TicketsContainer = styled.div`
  margin-top: 37px;
  h2 {
    color: #8e8e8e;
  }
`;

const TicketsAvailable = styled.div`
  margin-top: 17px;
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  h1 {
    font-size: 16px;
  }
  p {
    margin-top: 3px;
    font-size: 14px;
    color: #898989;
  }
  div {
    background-color: white;
    border-radius: 20px;
    height: 145px;
    width: 145px;
    border: 1px solid #cecece;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
  }
`;

const NoEnrollment = styled.div`
  width: 388px;
  color: #8e8e8e;
  text-align: center;
  margin: auto;
  margin-top: 243px;
`;

const ConfimationHeadline = styled.div`
  font-size: 20px;
  margin-top: 20px;

  color: #8e8e8e;
  h2 {
    margin-top: 10px;
  }

  button {
    margin-top: 17px;
    width: 162px;
    height: 37px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
    :hover {
      background-color: green;
      cursor: pointer;
    }
  }
`;