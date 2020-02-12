import React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

const Container = styled.tr`
  .production {
    color: ${props=>(props.production? 'green' : '#CCC')};
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }
  text-align: center;

  td:first-child {
    text-align: left;
    padding-left: 8px;
  }

`;

export default function UtilityRow(props) {

  const dispatch = useDispatch();

  const {id, utility_name, state, program_count, program_list, program_id, production} = props.utility;

  function toggleProduction() {
    const myPayload = {id, production: !production, page: props.page, search: props.search};
    dispatch({type: 'SET_UTILITY_PRODUCTION', payload: myPayload});
  }

  function openModal(){
    dispatch({type: 'SET_RECORDS_MODAL_UTILITY', payload: props.utility});
    dispatch({type: 'SET_ADMIN_RECORDS_MODAL_OPEN', payload: true});
  }

  return (
    <Container className="utility-row" production={production}>
      <td>{utility_name}</td>
      <td>{state}</td>
      <td>{program_count} {(program_count==1? 'program' : 'programs')}</td>
      <td>
        <button
          className="button-default"
          onClick={openModal}
        >Details</button>
      </td>
    </Container>
  )
}

