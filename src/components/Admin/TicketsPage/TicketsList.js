import React from 'react';
import {useSelector} from 'react-redux';
import {CheckBox, TableCell, TableRow} from '@material-ui/core';

function Ticket({ticket}){
    const {resolved, zip, utility_name, program_name, email, comments} = ticket;
    return(
        <TableRow>
            <TableCell>{zip}</TableCell>
            <TableCell>{utility_name}</TableCell>
            <TableCell>{program_name}</TableCell>
        </TableRow>
    )
}

export default function TicketsList(props){
    const tickets = useSelector(state => state.tickets.tickets);

    return !tickets ? null : tickets.map((ticket, i) =>
        <Ticket ticket={ticket} key={i} />
    );
}

/*
    id: 8
    resolved: false
    zip: 55123
    utility_name: "Northern States Power Co - Minnesota"
    eia_state: null
    program_name: "Windsource"
    gpp_id: null
    email: ""
    comments: "aflk"
*/