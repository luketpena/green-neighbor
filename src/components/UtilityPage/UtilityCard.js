import React from 'react';
import styled from 'styled-components';

import ProgramCard from './ProgramCard';

const UtilityCardBody = styled.div`

  margin: 32px 0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,.3);
  
`;

const UtilityHeader = styled.div`
  background-color: var(--color-primary);
  color: white;
  height: 64px;
  display: grid;
  grid-template-areas: "title button";
  grid-template-columns: 1fr auto;
  align-items: center;

  h3 {
    margin-left: 16px;
    grid-area: title;
    font-family: var(--font-main);
  }
  button {
    grid-area: button;
  }
`;

const ProgramCardBox = styled.div`
  padding: 16px;
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
        <button className="button-default">Report missing program</button>
      </UtilityHeader>
      <ProgramCardBox>
        {renderPrograms()}
      </ProgramCardBox>
    </UtilityCardBody>
  )
}