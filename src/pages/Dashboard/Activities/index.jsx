import styled from 'styled-components';
import useGetTicket from '../../../hooks/api/useGetTicket';
import { useEffect, useState } from 'react';
import useGetActivityDays from '../../../hooks/api/useGetActivities';
//import useGetActivityOfDay from '../../../hooks/api/useGetActivitieOfDay';
import dayjs from 'dayjs';
import './pt'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ActivitiesComp from "../../../components/ActivitiesComponent/ActivitiesComp";

dayjs.locale('pt');

dayjs.extend(customParseFormat);


/* function convertData(arraydata) {
  console.log('veio o body')
  console.log(arraydata)
  for (let i = 0; i < arraydata.length; i++) {
    arraydata[i].date_trunc = dayjs(arraydata[i].date_trunc).format('YYYY-MM-DD');
  }
  console.log('apos formatar')
  console.log(arraydata);
  return arraydata;
} */

export default function Activities() {
  const [dateData, setDateData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const { getactivitydays } = useGetActivityDays();
  //const { getactivityofday } = useGetActivityOfDay();
  //const [data, setData] = useState();

  const { ticket } = useGetTicket();

  useEffect(() => {
    getactivitydays()
      .then((res) => {
        console.log(res)
        let arr = [];
        for (let i = 0; i < res.length; i++) {
          arr[i] = dayjs(res[i].date_trunc.slice(0, -15)).format('YYYY-MM-DD');
        }
        console.log(arr)
        
        setDateData(arr);
      });
  }, []);

/*   useEffect(() => {
     if (selectedDay) {
      getactivityofday(selectedDay).then((res) => { setData(res); });
    }; 
    console.log('dia selecionado ' + selectedDay)
  }, [selectedDay]); */

  if (!ticket) {
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

      {selectedDay == null ?
        <SubTitle>
          Primeiro, filtre pelo dia do evento:
        </SubTitle> : null}
      <ContainerSecond>
        {dateData?.map((el, index) => {
          return <ActivityDate
            key={index}
            selected={selectedDay === el}
            onClick={() => { setSelectedDay(el); }}>
            {new Date(el)
              .toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'numeric',
              })
              .replace('-feira', '')}
          </ActivityDate>;
        })}
      </ContainerSecond>
      { selectedDay == null ? null : <ActivitiesComp date={selectedDay}/> }
    </Container>
  )
}


const Container = styled.div`
  h1 {
    font-size: 34px;
    margin-bottom: 20px;
  }
  height: 100%;
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

const SubTitle = styled.span(() => ({
  color: '#8E8E8E',
  marginTop: '20px',
  fontSize: '20px',
  lineHeight: '23px',
}));

const ContainerSecond = styled.div`
  width: 420px;
  display: flex;
  align-items: center;
  gap: 17px;
  margin-bottom: 10px;
`;

const ActivityDate = styled.div`
  width: 131px;
  height:37px;
  background-color: ${(props) => (props.selected ? '#FFD37D' : '#e0e0e0')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`;

/* const GridVenue = styled.div`
  display: flex;
  min-height: 365px;
  height: auto;
  width: 100%;
  margin: 0 0 55px 0;
`;
 */