import { useState } from "react"
import styled from "styled-components";
import { BiLogIn, BiXCircle } from "react-icons/bi";

export default function ActivitiesComp() {
  console.log(asd)
  const [activities, setActivities] = useState([
    {
      place: "Auditório Principal",
      event: [
        {
          title: "Minecraft, montando o PC ideal",
          time: "09:00 - 10:00",
          vacancies: 27
        },
        {
          title: "LoL, montando o PC ideal",
          time: "10:00 - 11:00",
          vacancies: 0
        }
      ]
    },
    {
      place: "Auditório lateral",
      event: [
        {
          title: "Palestra X",
          time: "09:00 - 11:00",
          vacancies: 0
        }
      ]
    },
    {
      place: "Sala de Workshop",
      event: [
        {
          title: "Palestra Y",
          time: "09:00 - 10:00",
          vacancies: 32
        },
        {
          title: "Palestra Z",
          time: "10:00 - 11:00",
          vacancies: 11
        }
      ]
    }
  ]);


  return (
    <MainContainer>
      {activities.map((activity, index1) => (
        <SecondContainer>
          <Title>{activity.place}</Title>
          <ActivityContainer key={index1}>
            {activity.event.map((lecture, index2) => (
              <Activity key={index2}>
                <p><strong>{lecture.title}</strong>
                <br />{lecture.time}</p>
                {lecture.vacancies ?
                  <Vacancies>
                    <BiLogIn color="#078632" size={25}/>
                    <p>{lecture.vacancies} vagas</p>
                  </Vacancies>
                  :
                  <Vacancies>
                    <BiXCircle color="#CC6666" size={25}/>
                    <p>Esgotado</p>
                  </Vacancies>
                }
              </Activity>
            ))}
          </ActivityContainer>
        </SecondContainer>
      ))}
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

const SecondContainer = styled.div`
  
`;

const Title = styled.h1`
  color: #7B7B7B;
  font-size: 17px;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
`;

const ActivityContainer = styled.div`
  padding: 10px;
  border: 1px solid #D7D7D7;
  color: #343434;
  height: 450px;
`;

const Activity = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 270px;
  background-color: #F1F1F1;
  padding: 10px;
  border-radius: 5px;
  height: 80px;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 10px;
`;


const Vacancies = styled.div`
  width: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #CFCFCF;
  p {
    font-size: 9px;
  }
`