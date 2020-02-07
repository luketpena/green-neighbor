import React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr 1fr;
  text-align: center;
  p {
    margin: 0 8px;
  }
  p:first-child {
    text-align: left;
  }
  .production {
    color: ${props=>(props.active? 'var(--color-primary)' : '#AAA')};
    transition: all .2s;
    &:hover {
      color: ${props=>(props.active? 'var(--color-primary-bright)' : '#666')};
      transform: scale(1.2);
      cursor: pointer;
    }
  }
`;

const ButtonBox = styled.div`

`;

export default function UtilityRow(props) {

  const dispatch = useDispatch();

  const {id, utility_name, zip, state, program_count, production} = props.utility;

  function toggleProduction() {
    const myPayload = {
      id,
      production: !production
    }
    dispatch({type: 'SET_UTILITY_PRODUCTION', payload: myPayload})
  }

  return (
    <Container className="utility-row">
      <InfoBox>
        <p>{utility_name}</p>
        <p>{state}</p>
        <p>{zip}</p>
        <p>{program_count} {(program_count==1? 'program' : 'programs')}</p>
        <p 
          className="production" 
          active={production}
          onClick={toggleProduction}
        >
          {(production? 'Live' : 'Inactive')}
        </p>
      </InfoBox>
      <ButtonBox>
        <button className="button-default">Details</button>
        <button className="button-default">Edit</button>
      </ButtonBox>
    </Container>
  )
}