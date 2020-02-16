import React, {useEffect}  from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default function SocialMedia() {
    useEffect(()=>{
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-embed")[0].appendChild(script)
    }, []);

    useEffect(()=>{
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0";
        document.getElementsByClassName("facebook-embed")[0].appendChild(script)
    }, []);

  return(
    <Container className="cardContent">
        <div>
          <h2>Follow us on social media</h2>
          <h3>And share us with your neighbors!</h3>
        </div>

          <div className="socialMediaBox">
            <div className="twitter-embed">
                <a 
                    className="twitter-follow-button"
                    href="https://twitter.com/GreenNeighborCh?ref_src=twsrc%5Etfw"
                    rel="noopener noreferrer"
                    target="_blank"
                    data-size="medium"
                    data-show-count="default">
                        Follow @GreenNeighborCh
                </a>
            </div>

            <div className="facebook-embed">
                <div 
                    className="fb-like" 
                    data-href="https://www.facebook.com/GreenNeighborChallenge/" 
                    data-width="250" 
                    data-layout="standard" 
                    data-action="like" 
                    data-size="large" 
                    data-share="true">
                </div>
            </div>
          </div>
    </Container>
  )
}