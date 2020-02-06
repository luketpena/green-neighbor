import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Page = styled.div`
  height: 100vh;
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
      {body && body.map(entry => <Entry>{entry}</Entry>)}
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

  const activeTickets = 80;
  const resolvedTickets = 100;
  const liveRecords = 1234;
  const draftRecords = 12;

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