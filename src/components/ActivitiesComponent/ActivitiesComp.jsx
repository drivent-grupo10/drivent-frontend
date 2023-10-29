import { useState, useEffect } from "react"
import styled from "styled-components";
import { BiLogIn, BiXCircle } from "react-icons/bi";
import useGetActivityByPlace from "../../hooks/api/useGetActivitiesByPlace";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import useToken from "../../hooks/useToken";
import { postActivitiesBookings } from "../../services/activitiesApi";

export default function ActivitiesComp({ date }) {
  //console.log("Data: " + date)
  const [activities, setActivities] = useState([]);
  const token = useToken();

  const { getActivitiesPlace } = useGetActivityByPlace(date);


  useEffect(() => {
    getActivitiesPlace()
      .then((res) => {
        setActivities(res)
      });
  }, [date]);


  function handleClick(id) {
    //console.log(id)
    postActivitiesBookings(token, id)
      .then(() => {
        toast("Atividade Reservada!")
      })
      .catch(err => { 
        toast(err.response.data.message)
      })
  }

  return (
    <MainContainer>
      {activities.map((activity, index1) => (
        <SecondContainer key={index1}>
          <Title>{activity.name}</Title>
          <ActivityContainer>
            {activity.Activities.map((lecture, index2) => (
              <Activity key={index2}
                height={new Date(lecture.endAt).getHours() - new Date(lecture.startAt).getHours()}>
                <p><strong>{lecture.name}</strong>
                  <br />{dayjs(lecture.startAt).format('HH')}:{dayjs(lecture.startAt).format('mm')} - {dayjs(lecture.endAt).format('HH')}:{dayjs(lecture.endAt).format('mm')}</p>
                {lecture.capacity ?
                  <Vacancies onClick={() => handleClick(lecture.id)}>
                    <BiLogIn color="#078632" size={25} />
                    <p>{lecture.capacity} vagas</p>
                  </Vacancies>
                  :
                  <Vacancies onClick={() => console.log("oi")}>
                    <BiXCircle color="#CC6666" size={25} />
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

const Title = styled.p`
  color: #7B7B7B;
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 20px;
  text-align: center;
`;

const ActivityContainer = styled.div`
  width: 295px;
  padding: 10px;
  border: 1px solid #D7D7D7;
  height: 450px;
  overflow-y: scroll;
`;

const Activity = styled.button`
  text-align: start;
  color: #343434;
  font-weight: 400;
  cursor: pointer;
  border: none;
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 270px;
  background-color: #F1F1F1;
  padding: 10px;
  border-radius: 5px;
  height: ${props => 80 * props.height}px;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 10px;
`;


const Vacancies = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #CFCFCF;
  p {
    font-size: 9px;
  }
`