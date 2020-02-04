import React from 'react';
import styled from 'styled-components';
import {Hashtag} from 'react-twitter-widgets';

const Container = styled.div`
width: auto;
height: auto;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: center;
`;

export default function ProblemCard () {
    return(
    <Container className="container">
        <h3>Notice a Problem?</h3>
        <p>Supporting text</p>
        <button class= "button-primary">Go!</button>
    </Container> 
    )
  };