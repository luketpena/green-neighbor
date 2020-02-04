import React from 'react';
import styled from 'styled-components';

import ProgramCard from './ProgramCard';

const UtilityCardBody = styled.div`
  max-width: 800px;
  margin: 32px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 8px 0 rgba(0,0,0,.3);
  background-color: var(--color-bkg-dark);
  
`;

const UtilityHeader = styled.div`
  background-color: var(--color-primary);
  color: white;
  height: 64px;
  display: grid;
  grid-template-areas: "title button";
  grid-template-columns: 1fr auto;
  align-items: center;

  box-shadow: 0 3px 8px 0 rgba(0,0,0,.3);

  h3 {
    margin: 0 0 0 8px;
    font-size: 24px;
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

const EmptyProgramDiv = styled.div`
  text-align: center;
  color: white;
  font-family: var(--font-main);
`;


export default function UtilityCard(props) {

  function renderPrograms() {
    if (props.company.programs.length>0) {
      return props.company.programs.map( (item,i)=>{
        return <ProgramCard key={i} program={item} />
      });
    } else {
      return <EmptyProgramDiv>
        <p>We couldn't find any programs for this company.</p>
      </EmptyProgramDiv>
    }
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