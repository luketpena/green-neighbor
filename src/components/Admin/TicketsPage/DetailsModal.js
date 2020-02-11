import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {Modal} from '@material-ui/core';

const ModalBody = styled.div`
    position: absolute;
    max-width: 32rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    :focus {
        outline: none;
    }
`;

const MarginLeft = styled.div`
    margin-left: 4px;
`;

const TicketInfo = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    p {
        padding: 4px;
        margin: 0px;
        background-color: #EEEEEE;
        border-bottom: 1px solid #CCCCCC
    }
    p:nth-child(4n){
        background-color: #FFFFFF;
    }
    p:nth-child(4n-1){
        background-color: #FFFFFF;
    }
`;

export default function DetailsModal(props){
    const dispatch = useDispatch();
    const open = useSelector(state => state.adminTicketsModalOpen);
    const ticket = useSelector(state => state.adminTicketsModalTicket);
    ticket.date_submitted = new Date(ticket.date_submitted);
    const closeModal = e => {
        dispatch({type: 'SET_TICKET_MODAL_OPEN', payload: false});
    }

    return(
        <Modal
            aria-labelledby='admin-tickets-details-modal'
            open={open}
            onBackdropClick={closeModal}
        >
            <ModalBody
                className='container'
                id='admin-tickets-details-modal'
            >
                <MarginLeft>
                    <h2>Ticket Details</h2>
                    <p>{ticket.resolved ? 'Resolved' : 'Active'}</p>
                </MarginLeft>
                <TicketInfo>
                    <p>Submitted:</p>
                    <p>{ticket.date_submitted && 
                        ticket.date_submitted.toLocaleDateString()}
                    </p>
                    <p>Zip:</p><p>{ticket.zip}</p>
                    {ticket.eia_state && 
                        <>
                            <p>EIAID - State:</p>
                            <p>{ticket.eia_state}</p>
                        </>
                    }
                    <p>Utility:</p><p>{ticket.utility_name}</p>
                    {ticket.program_name &&
                        <>
                            <p>Program:</p><p>{ticket.program_name}</p>
                        </>
                    }
                </TicketInfo>
                {ticket.comments && ticket.comments !== '' &&
                    <>
                        <p>Comment:</p>
                        <p>{ticket.comments}</p>
                    </>
                }
                <button
                    onClick={closeModal}
                    className='button-default'
                >Close</button>
            </ModalBody>
        </Modal>
    )
}