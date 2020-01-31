import React, {useState} from 'react';
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

const UtilityCardBox = styled.div`
  grid-area: programs;
`;

const UtilityCardBody = styled.div`
  background-color: black;
  margin: 32px 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,1);
  border: 2px solid var(--color-button-primary-light);
`;

const UtilityHeader = styled.div`
  background-color: var(--color-button-primary-light);
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  box-shadow: 0 0px 8px 4px rgba(0,0,0,.5);
  h3 {
    margin-left: 16px;
  }
`;

const ProgramCardBox = styled.div`

`;

const ProgramCardBody = styled.div`
  margin: 8px 0;
  h4 {
    margin: 0;
  }
  height: ${props=>(props.detailsActive? '230' : '130')}px;
  overflow: hidden;
  transition: height .5s;
`;

const ProgramCardHeader = styled.div`
  background-color: var(--color-button-primary-main);
  color: white;
  display: flex;
  align-items: center;
  padding-left: 16px;
  position: relative;
  z-index: 2;
  height: 30px;
`;

const ProgramCardMain = styled.div`
  background-color: var(--color-bkg-highlight);
  box-shadow: 0 2px 4px 2px rgba(0,0,0,.5);
  position: relative;
  z-index: 1;
  height: 100px;
`;

const ProgramCardDetails = styled.div`
  background-color: yellow;
  height: 100px;
  left: 0;
`;

function UtilityList () {

  function renderUtilities() {
    return dummyData.map( (item,i)=>{
      return <UtilityCard key={i} company={item}/>
    });
  }

  return (
    <UtilityCardBox className="container">
      {renderUtilities()}
    </UtilityCardBox>
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

  let [detailsActive, setDetailsActive] = useState(false);

  return (
    <ProgramCardBody detailsActive={detailsActive}>
      <ProgramCardHeader>
        <h4>{props.program.program_name}</h4>
      </ProgramCardHeader>

      <ProgramCardMain onClick={()=>setDetailsActive(!detailsActive)}>

      </ProgramCardMain>

      <ProgramCardDetails>

      </ProgramCardDetails>
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