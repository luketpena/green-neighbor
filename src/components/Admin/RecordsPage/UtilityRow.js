import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr 1fr;
  p {
    margin: 0 8px;
  }
  .production {
    color: ${props=>(props.active? 'var(--color-primary-light)' : '#AAA')}
  }
`;

const ButtonBox = styled.div`

`;

export default function UtilityRow(props) {

  const {id, utility_name, zip, state, program_count, production} = props.utility;

  return (
    <Container className="utility-row">
      <InfoBox>
        <p>{utility_name}</p>
        <p>{state}</p>
        <p>{zip}</p>
        <p>{program_count} {(program_count==1? 'program' : 'programs')}</p>
        <p className="production" active={production}>{(production? 'Live' : 'Inactive')}</p>
      </InfoBox>
      <ButtonBox>
        <button className="button-default">Details</button>
        <button className="button-default">Edit</button>
      </ButtonBox>
    </Container>
  )
}