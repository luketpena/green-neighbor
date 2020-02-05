import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
width: auto;
height: auto;
margin: 0 auto;
display: flex;
flex-direction: column;
justify-content: center;
`;

export default function DiscoverCard () {
  return(
  <Container className="container">
      <h3>Discover Green Energy's Impact</h3>
      <p>Supporting text</p>
      <button class= "button-primary">Go!</button>
  </Container> 
  )
};