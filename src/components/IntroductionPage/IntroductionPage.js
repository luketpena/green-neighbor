import React, { useState } from 'react';
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

export default function IntroductionPage(props) {
    const history = useHistory();
    let [zipInput, setZipInput] = useState('');

    function sendZipValue(){
      history.push(`/utility/${zipInput}`)
    }

  return(
    <Container>
      <TitleBox>
          <h1>Green Neighbor</h1>
      </TitleBox>

      <ZipBox>
          <p>Find green energy near you.</p>
          <label>Zip Code: </label><br/><input className="zip-input" type="number" 
          placeholder="55124" value={zipInput} onChange={event => setZipInput(event.target.value)}/><br/>
          <button className="button-default" onClick={()=>sendZipValue(zipInput)}>Go</button>
      </ZipBox>

      <LearnBox className="container">
        <p>Click on the buttons to learn more about us or to help us out</p>
        <button className="button-default" onClick={()=>history.push("/about")}>Learn more about us</button> 
        <button className="button-default" onClick={()=>history.push("/contribute")}>Help us out</button>
        {/* update push links to when we had those pages set up */}
      </LearnBox>

    </Container>
  )
}