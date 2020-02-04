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


export default function SocialCard () {
    return(
    <Container className="container">
          <h3>Share With Your Friends!</h3>
          <p>Supporting text</p>
          <button class= "button-primary" >Facebook</button>
  
          <Hashtag 
            hashtag="GNP,greenenergy,">
          </Hashtag>
    </Container> 
    )
  };