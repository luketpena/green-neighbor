import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TableBody, TableCell, TableRow} from '@material-ui/core';

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
        <TableRow style={{'&:nth-child(odd)': {backgroundColor: '#DDDDDD'}}}>
            <TableCell>{zip}</TableCell>
            <TableCell>{utility_name}</TableCell>
            <TableCell>{program_name}</TableCell>
            <TableCell>
                <input
                    type='checkbox'
                    checked={resolvedChecked}
                    onChange={onResolvedClicked}
                />
            </TableCell>
        </TableRow>
    )
}

let key = 0;

export default function TicketsList(props){
    const tickets = useSelector(state => state.tickets.tickets);

    return !tickets ? null : (
        <TableBody>
            {tickets.map((ticket, i) =>
                <Ticket ticket={ticket} key={key++} />
            )}
        </TableBody>
    );
}