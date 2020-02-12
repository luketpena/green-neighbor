import React, {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const Container = styled.div`
h2 {
    text-align: center;
}
`


export default function PricingForm(props){

    const dispatch = useDispatch();

    const [length, setLength] = useState();
    const [minimum, setMinimum] = useState();
    const [termination, setTermination] = useState();
    const [termination_cost, setTermination_cost] = useState();

    const updateSubmissionForm = obj => {
        dispatch({type: 'UDATE_SUBMISSION_FORM', payload: obj});
    }


    return (
        <Container>
            <h2>Contract</h2>
                <label>Length</label>
                <label>Minimum</label>
                <select 
                    value={minimum}
                    onChange={e=>setMinimum(e.target.value)}
                    onBlur={e=>updateSubmissionForm({monthly_min: minimum})}
                >
                    <option value={'No'}>No</option>
                    <option value={'Yes'}>Yes</option>
                </select>
                <label>Termination Fee</label>
                <input 
                    type="checkbox"
                    value={termination}
                    onChange={e=>setTermination(e.target.value)}
                />
                <label>Termination Cost</label>
                <input/>
        </Container>
    )
}