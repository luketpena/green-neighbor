import React from 'react';
import styled from 'styled-components';

const dummyData = [
  {
    name: 'Drill Baby Drill',
    programs: [
      {
        program_name: 'Solar Stuff',
      },
      {
        program_name: 'Corn Stuff'
      }
    ]
  },
  {name: 'We Love Oil Inc.', programs: []},
  {name: 'Windmills are Neat', programs: []}
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

const ProgramCardBox = styled.div`

`;

const ProgramCardBody = styled.div`
  background-color: purple;
  height: 64px;
`;

function UtilityList () {

  function renderUtilities() {
    return dummyData.map( (item,i)=>{
      return <UtilityCard key={i} company={item}/>
    });
  }

  return (
    <ProgramsBox className="container">
      {renderUtilities()}
    </ProgramsBox>
  )
}

function UtilityCard (props) {

  function renderPrograms() {
    return props.company.programs.map( (item,i)=>{
      return <ProgramCard key={i} program={item} />
    });
  }

  return (
    <UtilityCardBody>
      <UtilityHeader>
        <h3>{props.company.name}</h3>
      </UtilityHeader>
      <ProgramCardBox>
        {renderPrograms()}
      </ProgramCardBox>
    </UtilityCardBody>
  )
}

function ProgramCard (props) {
  return (
    <ProgramCardBody>
      <h4>{props.program.program_name}</h4>
    </ProgramCardBody>
  )
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