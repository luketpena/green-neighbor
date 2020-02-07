import React from 'react';
import styled from 'styled-components';

import HomeButton from '../HomeButton/HomeButton';

const Container = styled.div`
display: grid;
grid-template-areas: "menu details";
grid-template-rows: 1fr auto;
// grid-template-columns: 250px 1fr;
`;

const Header = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  
// color: white;
// text-shadow: 0 0 4px black;
h1 {
  font-family: var(--font-header);
  font-size: 64px;
  margin: 0;
}
`;

const Menu = styled.div`
grid-area: menu;
height: 400px;
background-color: red;
`;

const Details = styled.div`
grid-area: details;
height: 400px;
background-color: blue;
`;

export default function ContributePage() {

  return(
      <>
        <HomeButton/>
        <Header>
            <h1>Contribute</h1>
        </Header>
        <Container>
            <Menu>1</Menu>
            <Details>2</Details>
        </Container>
    </>
  )
}