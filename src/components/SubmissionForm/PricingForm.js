import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function PricingForm(props){
    const dispatch = useDispatch();
    const form = useSelector(state => state.submissionFormReducer);

    const [hasReducerFilled, setHasReducerFilled] = useState(false);
    const [costKwh, setCostKwh] = useState(form.cost_kwh || '');
    const formCostRange = form.cost_range && form.cost_range.split('-') || ['', ''];
    const [costRangeMin, setCostRangeMin] = useState(formCostRange[0]);
    const [costRangeMax, setCostRangeMax] = useState(formCostRange[1]);
    const [costIsRange, setCostIsRange] = useState(form.cost_range ? 1 : 0);
    const [creditYesNo, setCreditYesNo] = useState(form.credit_yn || 'No');
    const [creditKwh, setCreditKwh] = useState(form.credit_kwh || '');

    const updateSubmissionForm = obj => {
        dispatch({type: 'UDATE_SUBMISSION_FORM', payload: obj});
    }

    const costModelToggle = e => {
        const value = e.target.value;
        setCostIsRange(Number(value));
        if(value){
            updateSubmissionForm({cost_range: undefined});
        } else {
            updateSubmissionForm({cost_kwh: undefined});
        }
    }

    return (
        <div>
            <label htmlFor='submission-cost-model'>Cost </label>
            <select
                id='submission-cost-model'
                value={costIsRange}
                onChange={costModelToggle}
            >
                <option value={0}>per kWh</option>
                <option value={1}>Range</option>
            </select>
            {costIsRange ?
                <>
                    <label htmlFor='submission-cost-min'>Min: </label>
                    <input
                        type="number"
                        onChange={e => setCostRangeMin(!!e.target.vaule)}
                        placeholder='5.00'
                        step="0.01"
                        value={costRangeMin}
                        onBlur={()=>updateSubmissionForm({
                            cost_range:`${costRangeMin}-${costRangeMax}`
                        })}
                    />
                    <label htmlFor='submission-cost-max'>Max: </label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="10.00"
                        value={costRangeMax}
                        onChange={e => setCostRangeMax(!!e.target.value)}
                        onBlur={()=>updateSubmissionForm({
                            cost_range:`${costRangeMin}-${costRangeMax}`
                        })}
                    />
                </>:
                <>
                    <label htmlFor='submission-cost-kwh'>Cost kWh</label>
                    <input
                        id='submission-cost-kwh'
                        type="number"
                        value={costKwh}
                        onChange={e => setCostKwh(e.target.value)}
                        step="0.01"
                        onBlur={e => updateSubmissionForm({
                            cost_kwh: costKwh, cost_range: undefined
                        })}
                    />
                </>
            }
            <label htmlFor='submission-credit-yn'>Credit: </label>
            <select
                value={creditYesNo}
                onChange={e=>setCreditYesNo(e.target.value)}
                onBlur={e=>updateSubmissionForm({credit_yn: creditYesNo})}
            >
                <option value={'No'}>No</option>
                <option value={'Yes'}>Yes</option>
                <option value={'Included'}>Included</option>
            </select>
            {creditYesNo === 'Yes' && 
                <>
                    <label htmlFor='submission-credit-kwh'>Credit / kWh: </label>
                    <input
                        id='submission-credit-kwh'
                        value='creditKwh'
                        type="number"
                        onChange={e => setCreditKwh(e.target.value)}
                        onBlur={e=>updateSubmissionForm({credit_kwh: creditKwh})}
                        placeholder='2.99'
                    />
                </>
            }
        </div>
    )
}