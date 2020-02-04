import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';

const Container = styled.div`
    height: 100vh;
    width: max-content;
    margin: auto auto;
    align-text: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const Body = styled.form`
    height: max-content;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
`

export default function ReportErrorPage(props){

    const {zip, eia_state, program_id} = useParams();
    const [comments, setComments] = useState('');
    const dispatch = useCallback(useDispatch(), []);
    const {utility_name, program_name, id} = useSelector(state => program_id ? state.programDetails : state.utilityDataForReportPage);
    const [companyName, setCompanyName] = useState('');
    const history = useHistory();

    useEffect(()=>{
        if(program_id){
            dispatch({type: 'GET_PROGRAM_DETAILS', payload: program_id});
        }
        else if(zip && eia_state){
            dispatch({type: 'GET_UTILITY_NAME', payload: {zip, eia_state}});
        }
    }, [dispatch]);

    useEffect(()=>{
        setCompanyName(utility_name);
        if(!utility_name){
            history.push(`/report/${zip}`);
        }
    }, [utility_name, history]);

    const postTicket = () => {
        dispatch({type: 'POST_TICKET', payload: {zip, utility_name, program_name, program_id, comments} });
    }

    let body;
    if(program_id && eia_state){
        body = (
            <>
                <h1>Report Program Issue</h1>
                <p>{zip} - {utility_name} - {program_name}</p>
            </>
        )
    }
    else if(eia_state){
        body = (
            <>
                <h1>Report Missing Program</h1>
                <p>{zip} - {utility_name}</p>
            </>
        )
    }
    else if(zip){
        body = (
            <>
                <h1>Report Missing Utility in {zip}</h1>
                <TextField
                    required
                    label='Utility Name'
                    value={companyName || ''}
                    onChange={e=>setCompanyName(e.target.value)}
                />
            </>
        );
    }
    
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <Container>
            <Body className="container" onSubmit={handleSubmit}>
                {body}
                <TextField
                    label={ program_id ? "Description" : "Comments" }
                    placeholder='Provide more details about your issue'
                    multiline
                    value={comments}
                    onChange={e=>setComments(e.target.value)}
                />
                <button className='button-default' onClick={() => postTicket()}>Submit</button>
            </Body>
        </Container>
    )
}