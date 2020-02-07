import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  p {
    margin: 0 8px;
  }
`;

const ButtonBox = styled.div`

`;

export default function UtilityRow(props) {

  const {id, utility_name, zip, state, count} = props.utility;

  return (
    <Container className="utility-row">
      <InfoBox>
        <p>{utility_name}</p>
        <p>{state}</p>
        <p>{zip}</p>
        <p>{count} {(count===1? 'program' : 'programs')}</p>
      </InfoBox>
      <ButtonBox>
        <button className="button-default">Details</button>
        <button className="button-default">Edit</button>
      </ButtonBox>
    </Container>
  )
}