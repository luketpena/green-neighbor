import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MainTableBody} from '../AdminUI';
import styled from 'styled-components';
import {useHistory, useLocation} from 'react-router-dom';
import {Modal} from '@material-ui/core';

const ModalBody = styled.div`
    position: absolute;
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
                    <p>Utility:</p><p>{ticket.utility_name}</p>
                    {ticket.program_name &&
                        <>
                            <p>Program:</p><p>{ticket.program_name}</p>
                        </>
                    }
                    {ticket.comments && ticket.comments !== '' &&
                        <>
                            <p style={{gridColumn: '1 / span 2', border: 'none'}}>
                                Comment:
                            </p>
                            <p style={{gridColumn: '1 / span 2'}}>{ticket.comments}</p>
                        </>
                    }
                </TicketInfo>
                <button
                    onClick={closeModal}
                    className='button-default'
                >Close</button>
            </ModalBody>
        </Modal>
    )
}