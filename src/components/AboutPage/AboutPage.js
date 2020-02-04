import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
width: 90%;
height: 500px;
margin: 0 auto;
display: grid;
grid-template-areas: "questions answers" ;
grid-template-columns: 250px 1fr;

`;

const QBox = styled.div`
grid-area: questions;
background-color: lightblue

`;

const ABox = styled.div`
grid-area: answers;
background-color: orange

`;

export default function AboutPage() {
  const history = useHistory();

  return(
    <>
    <button className="button-default" onClick={()=>history.push("/intro")}>return home</button>
    <Container>
      

      <QBox className="container">
        questions
      </QBox>
      <ABox className="container">
        answers
      </ABox>
    </Container>
    </>
  )
}
