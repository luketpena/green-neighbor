import React from 'react';
import styled from 'styled-components';

import NewAdmin from '../ManageAdminsPage/NewAdmin';
import CurrentAdmin from'../ManageAdminsPage/CurrentAdmins';




const Container = styled.div`
    height: 100%
    margin: auto auto;
    align-text: center;
    justify-content: center;
    align-items: center;
    display: flex;
    
    .component-box {
      min-width: 320px;
     
    }
`;

export default function ManageAdminsPage() {

  return(
    <Container>
      <div >
        <NewAdmin className="component-box" />
        <CurrentAdmin  className="component-box"/> 
      </div>

    </Container> 

  )
}