import React, {useEffect} from 'react';
import styled from 'styled-components';
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
width: 90%;
height: 500px;
margin: 0 auto;
display: grid;
grid-template-areas: "menu details";
grid-template-rows: 100px 1fr;
grid-template-columns: max-content 1fr;
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
padding: 15px 0px 15px;
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
`;

export default function ContributePage() {
        

  return(
      <BackgroundBox>
            <HomeButton/>
            <Header>
                <h1>Contribute</h1>
            </Header>
        <Container>

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
        </Container>
    </BackgroundBox>
  )
}