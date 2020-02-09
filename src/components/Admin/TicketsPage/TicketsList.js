import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MainTableBody} from '../AdminUI';
import styled from 'styled-components';

const Resolved = styled.button`
    color: ${props=>(props.resolved? 'var(--color-primary)' : '#A53535')};
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    font-size: 1rem;
    transition: all .2s;
    &:hover {
        color: ${props=>(props.resolved? 'var(--color-primary-bright)' : '#333')};
        transform: scale(1.05);
        cursor: pointer;
    }
`;

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
                <Resolved
                    resolved={resolvedChecked}
                    onClick={onResolvedClicked}
                >
                    {resolvedChecked ? 'Resolved' : 'Active'}
                </Resolved>
            </td>
        </tr>
    )
}

let key = 0;

export default function TicketsList(props){
    const tickets = useSelector(state => state.tickets.tickets);

    return !tickets ? null : (
        <MainTableBody hoverable doubleLines>
            {tickets.map((ticket, i) =>
                <Ticket
                    ticket={ticket}
                    key={key++}
                />
            )}
        </MainTableBody>
    );
}