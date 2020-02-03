import React from 'react';
import styled from 'styled-components';

import ProgramCard from './ProgramCard';

const UtilityCardBody = styled.div`
  background-color: black;
  margin: 32px 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,1);
  border: 2px solid var(--color-button-primary-light);
`;

const UtilityHeader = styled.div`
  background-color: var(--color-button-primary-light);
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  box-shadow: 0 0px 8px 4px rgba(0,0,0,.5);
  h3 {
    margin-left: 16px;
  }
`;

const ProgramCardBox = styled.div`
`;


export default function UtilityCard(props) {

  function renderPrograms() {
    return props.company.programs.map( (item,i)=>{
      return <ProgramCard key={i} program={item} />
    });
  }

  return (
    <UtilityCardBody>
      <UtilityHeader>
        <h3>{props.company.name}</h3>
      </UtilityHeader>
      <ProgramCardBox>
        {renderPrograms()}
      </ProgramCardBox>
    </UtilityCardBody>
  )
}