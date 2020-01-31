import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 90%;
  height: 500px;
  margin: 0 auto;
  display: grid;
  grid-template-areas: "title help" "programs programs";
  grid-template-columns: 1fr 250px;
  grid-template-rows: 250px auto;
`;

const TitleBox = styled.div`
  grid-area: title;
  color: var(--color-text-dark);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 5%;

  p {
    margin: 0;
  }
  h2 {
    margin: 8px 0;
  }
`;

const HelpBox = styled.div`
  grid-area: help;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    display: block;
    margin: 8px auto;
    font-size: .8em;
  }
`;

const ProgramsBox = styled.div`
  grid-area: programs;
`;

export default function UtilityPage() {

  return(
    <Container>
      
      <TitleBox>
        <p>Showing results for</p>
        <h2>Saint Paul, MN 55104</h2>
        <p>We found # companies and # energy programs.</p>
      </TitleBox>

      <HelpBox>
        <h2>Help!</h2>
        <button className="button-default">My utility company isn't listed!</button>
        <button className="button-default">There are no energy programs!</button>
      </HelpBox>

      <ProgramsBox className="container">

      </ProgramsBox>

    </Container>
  )
}