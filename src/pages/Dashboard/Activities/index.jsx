import styled from 'styled-components';
import useGetTicket from '../../../hooks/api/useGetTicket';

export default function Activities() {

  const { ticket } = useGetTicket();
  console.log(ticket)

  if(!ticket) {
    return (
      <>
        <SCTitle>Escolha de Atividades</SCTitle>
        <SCContainerError>
          <SCError>
          Você ainda não tem um ticket! Volte para a página de inscrição!
          </SCError>
        </SCContainerError>
      </>
    );
  }

  if (ticket.status === 'RESERVED') {
    return (
      <>
        <SCTitle>Escolha de Atividades</SCTitle>
        <SCContainerError>
          <SCError> Você precisa ter confirmado pagamento antes</SCError>
          <SCError>de fazer a escolha de atividades</SCError>
        </SCContainerError>
      </>
    );
  }

  if (ticket.TicketType.isRemote) {
    return (
      <>
        <SCTitle>Escolha de hotel e quarto</SCTitle>
        <SCContainerError>
          <SCError>Sua modalidade de ingresso não necessita escolher atividade.</SCError>
          <SCError>Você terá acesso a todas as atividades.</SCError>
        </SCContainerError>
      </>
    );
  }

  return (
    <Container>
      <h1>Escolha de atividades</h1>
      <h2>Primeiro, filtre pelo dia do evento: </h2>
      <EventsContainer>
        <EventDay>
          Mostrar atividades
        </EventDay>
      </EventsContainer>
    </Container>
  )
}


const Container = styled.div`
  h1 {
    font-size: 34px;
  }
  height: 100%;
  h2 {
    color: #8e8e8e;
    margin-top: 37px;
    margin-bottom: 23px;
  }
`;

const EventsContainer = styled.div`
  display: flex;
`;

const EventDay = styled.div`
  width: 131px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-right: 17px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Att = styled.div`
  display: flex;

  h1 {
    font-size: 17px;
    color: #7b7b7b;
    text-align: center;
  }

  margin: auto;
  margin-top: 20px;
`;

const ActBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 288px;
`;

const InnerActBox = styled.div`
  border: 1px solid #d7d7d7;
  height: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 10px;

  div {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: #f1f1f1;
    font-size: 14px;
    color: #343434;
    box-sizing: border-box;
    padding: 10px;

    p {
      width: 180px;
    }
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    width: 50px;
    hr {
      height: 60px;
      width: 1px;
      background-color: #cfcfcf;
      border: none;
    }

    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 9px;
      ion-icon {
        font-size: 24px;
      }
    }
  }
`;


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
