import React from 'react';
import styled from 'styled-components';

import NewAdmin from '../ManageAdminsPage/NewAdmin';
import CurrentAdmin from'../ManageAdminsPage/CurrentAdmins';




const Container = styled.div`
    height: 100%
    margin: auto auto;
    align-text: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

export default function ManageAdminsPage() {

  return(
    <div>
      <Container>
        <NewAdmin />
      </Container>
      <Container>
        <CurrentAdmin /> 
      </Container>
    </div> 

  )
}