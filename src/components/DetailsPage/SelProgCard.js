import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
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

export default function SelectProgramCard () {
const history = useHistory();
  const {zip} = useParams();
    return(
    <Container className="container">
        <h3>Select a Different Program</h3>
        <p>Click below to view other programs in your area.</p>
        <button class= "button-primary" onClick={() => history.push(`/utility/${zip}`)}>Go!</button>
    </Container> 
    )
  };