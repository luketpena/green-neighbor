import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

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


// const UnderlineH1 = styled.h1`
// border-bottom: 2px solid currentColor;
// `;

// BEGIN bottom section component //
const BottomDash = () => (
  <BottomDisplay>
      <div className="container">
        <h3>Share With Your Friends!</h3>
        <p>Supporting text</p>
        <button class= "button-primary" >Go!</button>
      </div>
      <div className="container">
        <h3>Select a different Program!</h3>
        <p>Supporting text</p>
        <button class= "button-primary">Go!</button>
      </div><div className="container">
        <h3>Notice a Problem?</h3>
        <p>Supporting text</p>
        <button class= "button-primary">Go!</button>
      </div>
      <div className="container">
        <h3>Discover Green Energy's Impact</h3>
        <p>Supporting text</p>
        <button class= "button-primary">Go!</button>
      </div>
      <div className="container">
        <h3>Want to Contribute to the Project?</h3>
        <p>Supporting text</p>
        <button class= "button-primary">Go!</button>
      </div> 
  </BottomDisplay> 
);
//END bottom component // 

// go to program sign up button //
// function goSignUp () {
//   window.location.assign(details.sign_up_url);
// }

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