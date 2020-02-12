import React from 'react';
import styled from 'styled-components';
import Background from '../../../images/bkg-forest-top.jpg';

import NewAdmin from '../ManageAdminsPage/NewAdmin';
import CurrentAdmin from'../ManageAdminsPage/CurrentAdmins';




const ImageBackground = styled.div`
height: 100vh;
    width: 100%;
    margin: 0 auto;
    background-image: url(${Background});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
`;

const Container = styled.div`
    color: white;
    height: 100vh;
    width: max-content;
    margin: auto auto;
    align-text: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

export default function ManageAdminsPage() {

  return(
    <ImageBackground>
      <Container>
        <NewAdmin 
        />
        <CurrentAdmin 
        /> 
      </Container>
    </ImageBackground>
  )
}