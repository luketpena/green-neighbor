import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import ReportThankYou from '../ReportErrorPage/ReportThankYou';
import Background from '../../images/bkg-forest-top.jpg';

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
    background-color: rgba(0, 0, 0, 0.55);
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.4);
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
    const {
        utility_name, program_name, zips_id
    } = useSelector(state => program_id ? state.programDetails : state.utilityDataForReportPage);
    const [companyName, setCompanyName] = useState('');
    const [programName, setProgramName] = useState('');
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

    useEffect(()=>{
        setProgramName(program_name);
    }, [program_name, history]);

    const postThenBack = () => {
        const payload = {
            zip, utility_name: companyName, eia_state,
            program_name: programName, gpp_id: program_id, zips_id,
            comments, email
        }
        dispatch({ type: 'POST_TICKET', payload });
        history.goBack();
    }
    
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
                <Input
                    required
                    label='Program Name'
                    placeholder='Program Name'
                    value={programName || ''}
                    onChange={e=>setProgramName(e.target.value)}
                />
            </>
        )
    } else if(zip){
        body = (
            <>
                <h1>Report Missing Utility in {zip}</h1>
                <Input
                    required
                    label='Utility Name'
                    placeholder='Utility Name'
                    value={companyName || ''}
                    onChange={e=>setCompanyName(e.target.value)}
                />
            </>
        );
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setOpen(true);
    }

    return (
       <ImageBackground >
            <Container>
                <Body onSubmit={handleSubmit}>
                    {body}
                    <Input 
                        className="zip-input"            
                        label={ program_id ? "Description" : "Comments" }
                        placeholder='Provide more details about your issue'
                        value={comments}
                        onChange={e=>setComments(e.target.value)}
                        required={program_id && eia_state}
                    />
                    <Input 
                        type='email'
                        label='Email'
                        placeholder='Your Email for Ticket Progress'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <ReportThankYou open={open} postThenBack={postThenBack}  />
                    <button className='button-wire'>Submit</button>
                </Body>
            </Container>
        </ImageBackground>
    )
}