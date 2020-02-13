import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
h2 {
    text-align: center;
}
`


export default function PricingForm(props){

    const dispatch = useDispatch();

    const [length, setLength] = useState('');
    const [minimum, setMinimum] = useState('');
    const [termination, setTermination] = useState();
    const [termination_cost, setTermination_cost] = useState('');

    const updateSubmissionForm = obj => {
        dispatch({type: 'UDATE_SUBMISSION_FORM', payload: obj});
    }


    return (
        <Container>
            <h2>Contract</h2>
                <label>Length: </label>
                <input
                    type="text"
                    value={length}
                    onChange={e=>setLength(e.target.value)}
                    onBlur={e=>updateSubmissionForm({contract_length: length})}
                />
                <label>Minimum: </label>
                <input
                    type="text"
                    value={minimum}
                    onChange={e=>setMinimum(e.target.value)}
                    onBlur={e=>updateSubmissionForm({monthly_min: minimum})}
                />
                <label>Termination Fee: </label>
                <select
                    value={termination}
                    onChange={e=>setTermination(e.target.value)}
                    onBlur={e=>updateSubmissionForm({termination_fee: termination})}
                >
                    <option value={'No'}>No</option>
                    <option value={'Yes'}>Yes</option>
                </select>
                {termination === 'Yes' &&
                <>
                    <label>Termination Cost: </label>
                    <input
                        type="text"
                        value={termination_cost}
                    />
                </>
                }
                
                
        </Container>
    )
}