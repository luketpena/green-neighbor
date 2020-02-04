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
    font-family: var(--font-main);
  }
  h2 {
    margin: 8px 0;
    font-family: var(--font-header);
    font-size: 48px;
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