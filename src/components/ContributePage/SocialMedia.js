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
    <Container>
        <h2>FOLLOW US ON SOCIAL MEDIA</h2>
        <h3>AND SHARE US WITH YOUR NEIGHBORS</h3>

            <div className="twitter-embed">
                <a 
                    className="twitter-follow-button"
                    href="https://twitter.com/GreenNeighborCh?ref_src=twsrc%5Etfw"
                    rel="noopener noreferrer"
                    target="_blank"
                    data-size="large"
                    data-show-count="default">
                        Follow @GreenNeighborCh
                </a>
            </div>

            <div className="facebook-embed">
                <div 
                    className="fb-like" 
                    data-href="https://www.facebook.com/GreenNeighborChallenge/" 
                    data-width="279" 
                    data-layout="standard" 
                    data-action="like" 
                    data-size="large" 
                    data-share="true">
                </div>
            </div>
    </Container>
  )
}