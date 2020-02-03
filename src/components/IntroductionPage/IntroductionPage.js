import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
width: 90%;
height: 500px;
margin: 0 auto;
display: grid;
grid-template-areas: "title" "zip" "learn";
grid-template-rows: 150px 250px auto;

`;

const TitleBox = styled.div`
grid-area: title;
flex-direction: column;
justify-content: center;
text-align: center;
`;

const ZipBox = styled.div`
grid-area: zip;
flex-direction: column;
justify-content: center;
text-align: center;
`;

const LearnBox = styled.div`
grid-area: learn;
text-align: center;
flex-direction: column;
justify-content: center;
`;


function zipCode(){
    console.log('utilitiy page');
    // history.push(`/utility/${zip}`)
    
}



export default function IntroductionPage() {
    let history = useHistory();

  return(
    <Container>
      <TitleBox>
          <h1>Green Neighbor</h1>
      </TitleBox>

      <ZipBox>
          <p>Find green energy near you.</p>
          <label>Zip Code: </label><br/><input className="zip-input" type="number" placeholder="55124"/><br/>
          <button className="button-default" onClick={()=>zipCode()}>Go</button>
      </ZipBox>

      <LearnBox className="container">
        <p>Click on the buttons to learn more about us or to help us out</p>
        <button className="button-default" onClick={()=>history.push("/faq")}>Learn more about us</button> 
        <button className="button-default" onClick={()=>history.push("/contribute")}>Help us out</button>
        {/* update push links to when we had those pages set up */}
      </LearnBox>

    </Container>
  )
}