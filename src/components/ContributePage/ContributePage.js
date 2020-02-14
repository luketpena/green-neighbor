import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBullhorn, faEnvelopeOpenText, faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons';
import './contribute.css'
import Background from '../../images/bkg-forest-top.jpg';

// fancy home button
import HomeButton from '../HomeButton/HomeButton';
import SocialMedia from '../ContributePage/SocialMedia';
import NewsLetter from './NewsLetter';
import Donate from './Donate';




const BackgroundBox = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
`;

const Container = styled.div`
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

const Card = styled.div`
  background-color: rgba(255, 255, 255, .1);
  backdrop-filter: blur(4px);
  border: 2px solid white;
  border-radius: 16px;
  width: 320px;
  height: 320px;
  margin: 8px 16px;
  padding: 12px;
  box-sizing: border-box;

  display: grid;
  grid-template-rows: auto 1fr;

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
          
          <SocialMedia />
        </Card>

        <Card>
          <FontAwesomeIcon className="icon" icon={faEnvelopeOpenText} />
          <NewsLetter />
        </Card>

        <Card>
          <FontAwesomeIcon className="icon" icon={faHandHoldingUsd} />
          <Donate />
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