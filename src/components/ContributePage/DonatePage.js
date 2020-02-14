import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default function DonatePage() {

  return(
    <Container>
        <h3>Help bring the Green Neighbor Challenge to life!</h3>
            <a 
                href="https://actionnetwork.org/fundraising/green-neighbor-challenge-fundraising-page" 
                rel="noopener noreferrer"
                target="_blank">
                    <button className="button-default">Donate</button>
            </a>
    </Container>
  )
}