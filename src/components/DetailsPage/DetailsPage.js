import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import SocialCard from '../DetailsPage/SocialCard';
import SelectProgramCard from '../DetailsPage/SelProgCard';
import ProblemCard from '../DetailsPage/ProblemCard';
import DiscoverCard from '../DetailsPage/DiscoverCard';
import ContributeCard from '../DetailsPage/ContributeCard';

const Container = styled.div`
width: auto;
height: auto;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: center;
`;

const TitleDiv = styled.div`
width: 100%;
height: 250px;
margin: 0 auto;
display: block;
text-align: center;
justify-content: center;
`;

const BottomDisplay = styled.div`
width: 300x;
height: 200px;
display: flex;
margin: px auto;
padding-right: px;
justify-content: center;
align-content: center;
`;



// BEGIN bottom section component //
function BottomDash (details) {
  
  

  return(
  <BottomDisplay>
      <SocialCard />
      <SelectProgramCard />
      <ProblemCard />
      <DiscoverCard />
      <ContributeCard />
  </BottomDisplay> 
  )
};
//END bottom component // 



export default function DetailsPage() {

  const details = useSelector(state => state.programDetails)
  const dispatch = useDispatch();
  const {id} = useParams(); 
  


  useEffect(()=>{
    dispatch({type: 'GET_PROGRAM_DETAILS', payload: id});
  }, [id]);
  

  return(
    <Container>
      {JSON.stringify(details)}
      <TitleDiv>
        <h3>{details.utility_name} - {details.eiaid}</h3>
        <h1>{details.program_name}</h1>
        <p>You're one step closer to green energy.</p>
        <p>Continue to the program website to sign up!</p>
        <a href = {details.sign_up_url}>
          <button class= "button-primary" > Go!</button>
        </a>
      </TitleDiv>
      <BottomDash>
      </BottomDash>
    </Container>
  )
}