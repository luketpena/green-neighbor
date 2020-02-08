import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MainTable, MainTableBody, MainTableHead,
    MainTableRow, MainTableCell } from '../AdminUI';

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
        <MainTableRow>
            <MainTableCell>{zip}</MainTableCell>
            <MainTableCell>{utility_name}</MainTableCell>
            <MainTableCell>{program_name}</MainTableCell>
            <MainTableCell>
                <input
                    type='checkbox'
                    checked={resolvedChecked}
                    onChange={onResolvedClicked}
                />
            </MainTableCell>
        </MainTableRow>
    )
}

let key = 0;

export default function TicketsList(props){
    const tickets = useSelector(state => state.tickets.tickets);

    return !tickets ? null : (
        <MainTableBody>
            {tickets.map((ticket, i) =>
                <Ticket ticket={ticket} key={key++} />
            )}
        </MainTableBody>
    );
}