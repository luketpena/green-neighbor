import React from 'react';
import styled from 'styled-components';

const dummyData = [
  {utility_name: 'Drill Baby Drill'},
  {utility_name: 'We Love Oil Inc.'},
  {utility_name: 'Windmills are Neat'}
]

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

const UtilityCardBody = styled.div`
  background-color: var(--color-bkg-highlight);
  margin: 32px 0;
`;

const UtilityHeader = styled.div`
  background-color: steelblue;
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  h3 {
    margin-left: 16px;
  }
`;

function UtilityList () {

  function renderCompanies() {
    return dummyData.map( (item,i)=>{
      return <UtilityCard key={i} company={item}/>
    });
  }

  return (
    <ProgramsBox className="container">
      {renderCompanies()}
    </ProgramsBox>
  )
}

function UtilityCard (props) {
  return (
    <UtilityCardBody>
      <UtilityHeader>
        <h3>{props.company.utility_name}</h3>
      </UtilityHeader>
      content
    </UtilityCardBody>
  )
}

function ProgramCard (props) {
  
}

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

      <UtilityList />

    </Container>
  )
}