import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Background from '../../images/bkg-forest-top.jpg';

//-----< Component Imports >-----\\
import UtilityList from './UtilityList';
import HomeButton from '../HomeButton/HomeButton';


const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-areas: "title" "programs";
  grid-template-rows: 500px auto;

  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
`;

const TitleBox = styled.div`

  position: relative;
  z-index: 1;
  width: 100vw;

  grid-area: title;
  display: grid;
  grid-template-areas: "home" "main" "help";
  grid-template-rows: auto 1fr 80px;
  align-items: center;

  text-align: center;
  text-shadow: 0px 0px 4px black;
  color: var(--color-text-light);

  p {
    margin: 0;
    font-family: var(--font-main);
  }
  h2 {
    margin: 8px 0;
    font-family: var(--font-header);
    font-size: 48px;
  }
`;

const TitleBoxMain = styled.div`
  grid-area: main;
  
`;

const HelpBox = styled.div`
  grid-area: help;

`;

export default function UtilityPage(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const {zip} = useParams(); 
  const myParams = useParams();
  const geocode = useSelector(state=>state.geocode);
  const programs = useSelector(state=>state.programs);

  useEffect(()=>{
    console.log('Zip code on useEffect:',myParams);
    
    if (zip) {
      dispatch({type: 'GET_PROGRAMS', payload: zip});
    }
  },[zip]);

  function countPrograms() {
    let programList = [];
    for (let program of programs) {
      programList = [...programList, ...program.programs];
    }
    console.log('All programs found:', programList);
    
    return programList.length;
  }

  return(
    <Container>
      
      <TitleBox>
        <HomeButton />
        <TitleBoxMain>
          <p>Showing results for</p>
          <h2>{geocode || zip}</h2>
          <p>We found {programs.length} {(programs.length===1? 'company' : 'companies')} and {countPrograms()} energy {(countPrograms()===1? 'program' : 'programs')}.</p>
        </TitleBoxMain>

        <HelpBox>
          <button className="button-wire" onClick={()=>history.push(`/report/${zip}`)}>My utility company isn't listed!</button>
        </HelpBox>

      </TitleBox>


      <UtilityList />

    </Container>
  )
}