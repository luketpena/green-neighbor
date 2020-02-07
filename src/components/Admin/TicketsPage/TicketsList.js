import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Checkbox, TableCell, TableRow} from '@material-ui/core';

function Ticket({ticket}){
    const {
        id, resolved, zip, utility_name,
        program_name, email, comments
    } = ticket;
    const [resolvedChecked, setResolvedChecked] = useState(!!resolved);
    const dispatch = useDispatch();

    const onResolvedClicked = e => {
        const value = !resolvedChecked;
        dispatch({
            type: 'SET_TICKET_RESOLVE',
            payload: {id, value}
        });
        setResolvedChecked(value);
    }

    return(
        <tr>
            <td>{zip}</td>
            <td>{utility_name}</td>
            <td>{program_name}</td>
            <td>
                <input
                    type='checkbox'
                    checked={resolvedChecked}
                    onChange={onResolvedClicked}
                />
            </td>
        </tr>
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