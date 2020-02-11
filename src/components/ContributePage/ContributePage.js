import React, {useEffect} from 'react';
import styled from 'styled-components';
import Background from '../../images/bkg-forest-top.jpg';
// fancy home button
import HomeButton from '../HomeButton/HomeButton';


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
grid-template-columns: 250px 850px;
// justify-content: center;
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
overflow: scroll;
opacity: .82;
`;
const Div = styled.div`
padding: 15px 0px 15px;
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
`;

export default function ContributePage() {
        useEffect(()=>{
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            document.getElementsByClassName("twitter-embed")[0].appendChild(script)
        }, [])
    

  return(
      <BackgroundBox>
        <HomeButton/>
        <Header>
            <h1>Contribute</h1>
        </Header>
        <Container >

            <Menu>
                <button className="button-primary" >Follow us on Socal Media</button>
            </Menu> 

            <Details className="container">
                <Div>
                    <h2>FOLLOW US ON SOCIAL MEDIA</h2>
                    <h3>AND SHARE US WITH YOUR NEIGHBORS</h3>
                        <div className="twitter-embed">
                            <a className="twitter-follow-button"
                            href="https://twitter.com/GreenNeighborCh?ref_src=twsrc%5Etfw"
                            target="_blank"
                            data-size="large"
                            data-show-count="default">
                                Follow @GreenNeighborCh
                            </a>
                       </div>

                    <div>
                        <div id="fb-root"></div>
                            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>

                        <div class="fb-page" data-href="https://www.facebook.com/GreenNeighborChallenge/" 
                        data-tabs="timeline" data-width="" data-height="" data-small-header="true" 
                        data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false">
                            <blockquote cite="https://www.facebook.com/GreenNeighborChallenge/" class="fb-xfbml-parse-ignore">
                                <a href="https://www.facebook.com/GreenNeighborChallenge/" target="_blank">Like Us on Facebook</a></blockquote></div>
                    </div>
                </Div>
            </Details>
        </Container>
    </BackgroundBox>
  )

}