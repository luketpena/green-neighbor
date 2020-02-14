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
    const [minYesNo, setminYesNo] = useState('');
    const [minimum, setMinimum] = useState('');
    const [termination, setTermination] = useState('');
    const [termination_cost, setTermination_cost] = useState('');

    const updateSubmissionForm = obj => {
        dispatch({type: 'UDATE_SUBMISSION_FORM', payload: obj});
    }


    return (
        <Container>
            <h2>Contract</h2>
            <div>
                <label>Length: </label>
                    <input
                        type="text"
                        value={length}
                        placeholder="12-month"
                        onChange={e=>setLength(e.target.value)}
                        onBlur={e=>updateSubmissionForm({contract_length: length})}
                    />
                </div>
                <div>
                    <label>Is there a Monthly Minimum? </label>
                    <select 
                    value={minYesNo}
                    onChange={e=>setminYesNo(e.target.value)}
                    onBlur={e=>updateSubmissionForm({monthly_min: minYesNo})}
                    >
                        <option>Pick One</option>
                        <option value={'No'}>No</option>
                        <option value={'Yes'}>Yes</option>
                    </select>
                    {minYesNo === 'Yes' &&
                    <>
                        <label> Monthly Minimum: </label>
                        <input
                            type="text"
                            value={minimum}
                            placeholder="12-month"
                            onChange={e=>setMinimum(e.target.value)}
                            onBlur={e=>updateSubmissionForm({monthly_min: minimum})}
                        />
                    </>
                }
                </div>
                <div>
                    <label>Is there a Termination Fee? </label>
                    <select
                        value={termination}
                        onChange={e=>setTermination(e.target.value)}
                        onBlur={e=>updateSubmissionForm({termination_fee: termination})}
                    >
                        <option>Pick One</option>
                        <option value={'No'}>No</option>
                        <option value={'Yes'}>Yes</option>
                    </select>
                    {termination === 'Yes' &&
                    <>
                        <label> Termination Cost: </label>
                        <input
                            type="text"
                            value={termination_cost}
                            placeholder="150"
                            onChange={e=>setTermination_cost(e.target.value)}
                            onBlur={e=>updateSubmissionForm({termination_cost: termination_cost})}
                        />
                    </>
                }
            </div>
        </Container>
    )
}