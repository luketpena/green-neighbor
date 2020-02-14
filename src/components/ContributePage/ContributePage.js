import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBullhorn, faEnvelopeOpenText, faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons';

import Background from '../../images/bkg-forest-top.jpg';

// fancy home button
import HomeButton from '../HomeButton/HomeButton';
import SocialMedia from '../ContributePage/SocialMedia';
import NewsLetter from '../ContributePage/NewsLetterPage';
import Donate from '../ContributePage/DonatePage';




const BackgroundBox = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
`;

const Container = styled.div`
  background-color: red;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Header = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  
color: white;
text-shadow: 0 0 4px black;
h1 {
  font-family: var(--font-header);
  font-size: 64px;
  margin: 0;
}
`;

const Menu = styled.div`
grid-area: menu;
height: 400px;
grid-row: 2;
display: flex;
flex-direction: column;
align-items: right;
`;

const Details = styled.div`
grid-area: details;
grid-row: 2;

height: 400px;
overflow-y: scroll;
background-color:rgba(250,250,250,0.8);
`;

const Card = styled.div`
  background-color: blue;
  border-radius: 16px;
  width: 320px;
  height: 400px;
  margin: 8px 16px;

  .icon {
    color: white;
    display: block;
    margin: 16px auto;
    font-size: 80px;
  }
`;



export default function ContributePage() {
        

  return(
    <BackgroundBox>
      <HomeButton/>
      <Header>
          <h1>Contribute</h1>
      </Header>
      <Container>
        <Card>
          <FontAwesomeIcon className="icon" icon={faBullhorn} />
          Social
        </Card>

        <Card>
          <FontAwesomeIcon className="icon" icon={faEnvelopeOpenText} />
          News Letter
        </Card>

        <Card>
          <FontAwesomeIcon className="icon" icon={faHandHoldingUsd} />
          Donate
        </Card>
      
      </Container>
    </BackgroundBox>
  )
}

/*
<Menu>
    <button className="button-primary" >Follow us on Socal Media</button>
    <button className="button-primary" >News Letter</button>
    <button className="button-primary" >Donation</button>
</Menu> 

  <Details className="container">
    <Card>
        <SocialMedia/>
    </Card>
    <Card>
        <NewsLetter/>
    </Card>
    <Card>
        <Donate/>
    </Card>
  </Details>
*/