import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';
import ReportThankYou from '../ReportErrorPage/ReportThankYou';
import Background from '../../images/bkg-forest-top.jpg';
import { white } from 'color-name';

const Container = styled.div`
    color: white;
    height: 100vh;
    width: max-content;
    margin: auto auto;
    align-text: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const ImageBackground = styled.div`
    width: 100%;
    margin: 0 auto;
    background-image: url(${Background});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
`;

const Body = styled.form`
    h1 {
        font-family: var(--font-header);
        font-size: 64px;
        margin: 0;
    }
    h2 {
        margin: 0;
        font-family: var(--font-main);
        font-weight: lighter;
      }
    
    height: max-content;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    color: white;
    text-shadow: 0 0 4px black;
`;
 const Input = styled.input`
 
    background-color: rgba(255,255,255,.1);
    backdrop-filter: blur(0px);
    outline: none;
    margin: 10px;
    border: 1px solid white;
    text-shadow: 0 0 4px black;
    color: white;
    ::placeholder {
        color: white;
        opacity: .8;
    }
    font-size: 18px;
    padding: 8px;
    text-align: center;
    border-radius: 4px;
  
  `;


export default function ReportErrorPage(props){

    const {zip, eia_state, program_id} = useParams();
    const history = useHistory();
    const dispatch = useCallback(useDispatch(), []);
    const {utility_name, program_name, id} = useSelector(state => program_id ? state.programDetails : state.utilityDataForReportPage);
    const [companyName, setCompanyName] = useState('');
    const [comments, setComments] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

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
    }, [utility_name, history]);

    const postThenBack = () => {
        dispatch({type: 'POST_TICKET', payload: {zip, utility_name, program_name, program_id, comments, email} });
        history.goBack();
    } 

    const postTicket = () => {
        setOpen(true);
    }

    // const handleClose = () => {
    //     setOpen(false);
    //     };

    
    let body;
    if(program_id && eia_state){
        body = (
            <>
                <h1>Report Program Issue</h1>
                <p>{zip} - {utility_name} - {program_name}</p>
            </>
        )
    } else if(eia_state){
        body = (
            <>
                <h1>Report Missing Program</h1>
                <p>{zip} - {utility_name}</p>
            </>
        )
    } else if(zip){
        body = (
            <>
                <h1>Report Missing Utility in {zip}</h1>
                <Input
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
       <ImageBackground >
            <Container>
                <Body onSubmit={handleSubmit}>
                    {body}
                    <Input 
                        className="zip-input" 
                        type="multiline"                  
                        label={ program_id ? "Description" : "Comments" }
                        placeholder='Provide more details about your issue'
                        multiline
                        value={comments}
                        onChange={e=>setComments(e.target.value)}
                    />
                    <Input 
                        label='Email'
                        placeholder='Your Email for Ticket Progress'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <ReportThankYou open={open} postThenBack={postThenBack}  />
                    <button className='button-wire' onClick={() => postTicket()}>Submit</button>
                </Body>
            </Container>
        </ImageBackground>
    )
}