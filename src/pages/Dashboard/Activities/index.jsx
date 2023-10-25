import styled from "styled-components";
import ActivitiesComp from "../../../components/ActivitiesComponent/ActivitiesComp";

export default function Activities() {
  return <>
    <Title>Escolha de Atividades</Title>
    <ActivitiesComp />
  </>
}

const Title = styled.h1`
  font-size: 24px;
`