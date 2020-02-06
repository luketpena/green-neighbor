import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Page = styled.div`
  height: 100%;
  background-color: var(--color-bkg-dark);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: max-content;
  padding: 30vh 15% 0% 15%;
`;

const Box = styled.div`
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  margin: 8px;
  justify-content: space-between;
`;

const Entry = styled.p`
  margin: 0px;
`;

function Card({headerText, body, link, ...otherProps}){
  const history = useHistory();

  return (
    <Box className='container' {...otherProps}>
      <h2>{headerText}</h2>
      {body && body.map((entry, i) => <Entry key={i}>{entry}</Entry>)}
      <button
        className='button-primary'
        onClick={()=>history.push(link)}
      >
        Go
      </button>
    </Box>
  )
}

export default function AdminLandingPage() {
  const {
    tickets_active: activeTickets,
    tickets_resolved: resolvedTickets,
    records_live: liveRecords,
    records_draft: draftRecords
  } = useSelector(state => state.adminLandingPageData);
  const dispatch = useCallback(useDispatch(), []);
  useEffect(()=>{
    dispatch({type: 'GET_ADMIN_LANDING_DATA'});
  },[dispatch]);

  return(
    <Page>
      <Card
        headerText="Tickets"
        link='/admin/tickets'
        body={[`${activeTickets} Active`, `${resolvedTickets} Resolved`]}
      />
      <Card
        headerText="Records"
        link='/admin/records'
        body={[`${liveRecords} Live`, `${draftRecords} Drafts`]}
      />
      <Card
        headerText="Users"
        link='/admin/manageAdmins'
      />
    </Page>
  );
}