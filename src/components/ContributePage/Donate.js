import React from 'react';
import styled from 'styled-components';


const Container = styled.div``;

export default function Donate() {

  return(
    <Container className="cardContent">
        <h2>Help bring the Green Neighbor Challenge to life!</h2>
            <a 
                href="https://actionnetwork.org/fundraising/green-neighbor-challenge-fundraising-page" 
                rel="noopener noreferrer"
                target="_blank">
                    <button className="button-wire">Donate</button>
            </a>
    </Container>
  )
}