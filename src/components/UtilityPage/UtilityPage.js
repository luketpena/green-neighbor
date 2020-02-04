import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import UtilityList from './UtilityList';


const Container = styled.div`
  width: 90%;
  height: 500px;
  margin: 0 auto;
  display: grid;
  grid-template-areas: "title" "help" "programs ";
  grid-template-rows: 200px auto auto;
`;

const TitleBox = styled.div`
  grid-area: title;
  color: var(--color-text-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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


<<<<<<< HEAD
=======
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

  const programs = useSelector(state => state.programs);

  function renderUtilities() {
    return programs.map( (item,i)=>{
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
>>>>>>> 5a9d2076164df645bef5791c6ff471c1d6265d9e

export default function UtilityPage(props) {

  const dispatch = useDispatch();
  const {zip} = useParams(); 
  const geocode = useSelector(state=>state.geocode);

  useEffect(()=>{
    dispatch({type: 'GET_PROGRAMS', payload: zip});
  }, [zip]);

  return(
    <Container>
      
      <TitleBox>
        <p>Showing results for</p>
        <h2>{geocode}</h2>
        <p>We found # companies and # energy programs.</p>
      </TitleBox>

      <HelpBox>
        <button className="button-default">My utility company isn't listed!</button>
      </HelpBox>

      <UtilityList />

    </Container>
  )
}