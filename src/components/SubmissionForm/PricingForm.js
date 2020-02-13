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
    const [blocksAvailable, setBlocksAvailable] = useState(form.blocks_available || 'No');
    const [blocksAvailableMinMaxValue, setBlocksAvailableMinMaxValue] = useState(2);
    const [blockSizes, setBlockSizes] = useState(form.block_size_kwh && form.block_size_kwh.split(';') || []);
    const [blockCosts, setBlockCosts] = useState(form.block_cost && form.block_cost.split(';') || []);
    const [newBlockSizeKwh, setNewBlockSizeKwh] = useState('');
    const [newBlockCost, setNewBlockCost] = useState(''); 

    const formatAsCurrency = (str) => {
        str.replace(/[^0-9.]/g, '');
        str = str.split('.', 2);
        if(str[1] && str[1].length > 2){
            str[1] = str[1].substring(0, 2);
        }
        return str.join('.');
    }

    const formatAsInteger = (str, func) => {
        str.replace(/[^0-9.]/g, '');
        str = str.split('.', 2).join('.')
        if(func){
            func(str);
        }
        return str;
    }

    const updateSubmissionForm = obj => {
        dispatch({type: 'UPDATE_SUBMISSION_FORM', payload: obj});
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

    const updateBlocksAvailable = e => {
        let valueToSend = blocksAvailable;
        if(blocksAvailable === 'Min' || blocksAvailable === 'Max'){
            valueToSend += ` ${blocksAvailableMinMaxValue}`;
        }
        updateSubmissionForm({blocks_available: valueToSend});
    }

    const addBlock = e => {
        e.preventDefault();
        if(newBlockSizeKwh === '') return;
        blockSizes.push(newBlockSizeKwh);
        blockCosts.push(newBlockCost);

        updateSubmissionForm({
            block_size_kwh: blockSizes.join(';'),
            block_cost: blockCosts.join(';')
        });
        setBlockSizes(blockSizes);
        setBlockCosts(blockCosts);
        setNewBlockSizeKwh('');
    }

    const removeBlock = (index) => {
        blockSizes.splice(index, 1);
        blockCosts.splice(index, 1);
        updateSubmissionForm({
            block_size_kwh: blockSizes.join(';'),
            block_cost: blockCosts.join(';')
        })
        setBlockSizes(blockSizes);
        setBlockCosts(blockCosts);
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
                        onChange={e => setCostRangeMin(formatAsCurrency(e.target.value))}
                        placeholder='5.00'
                        step="0.01"
                        value={costRangeMin}
                        onBlur={()=>updateSubmissionForm({
                            cost_range: `${costRangeMin}-${costRangeMax}`
                        })}
                    />
                    <label htmlFor='submission-cost-max'>Max: </label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="10.00"
                        value={costRangeMax}
                        onChange={e => setCostRangeMax(formatAsCurrency(e.target.value))}
                        onBlur={()=>updateSubmissionForm({
                            cost_range: `${costRangeMin}-${costRangeMax}`
                        })}
                    />
                </>:<> {/* END costIsRange === true, BEGIN costIsRange===false */}
                    <label htmlFor='submission-cost-kwh'>Cost kWh</label>
                    <input
                        id='submission-cost-kwh'
                        type="number"
                        value={costKwh}
                        onChange={e => setCostKwh(formatAsCurrency(e.target.value))}
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
                        value={creditKwh}
                        type="number"
                        onChange={e => setCreditKwh(e.target.value)}
                        onBlur={e => updateSubmissionForm({credit_kwh: creditKwh})}
                        placeholder='2.99'
                    />
                </>
            }
            <label htmlFor='submission-blocks-available'>Blocks Available: </label>
            <select
                id='submission-blocks-available'
                value={blocksAvailable}
                onChange={e=>setBlocksAvailable(e.target.value)}
                onBlur={updateBlocksAvailable}
            >
                <option>No</option>
                <option>Fixed</option>
                <option>Any</option>
                <option>Min</option>
                <option>Max</option>
            </select>
            {(blocksAvailable === 'Min' || blocksAvailable === 'Max') && 
                <>
                    <label htmlFor='submission-blocks-available-min-max'>
                        {blocksAvailable} Blocks:&nbsp;
                    </label>
                    <input
                        id='submission-blocks-available-min-max'
                        value={blocksAvailableMinMaxValue}
                        onChange={e=>{
                            setBlocksAvailableMinMaxValue(formatAsInteger(e.target.value));
                        }}
                        onBlur={updateBlocksAvailable}
                    />
                </>
            }
            {blocksAvailable !== 'No' &&
                <>
                    <p>Blocks (kWh):</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Cost</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                        {blockSizes.map((blockSize, i) => 
                            <td>
                                <td>
                                    {blockSize}
                                </td>
                                <td>
                                    {blockCosts[i]}
                                </td>
                                <td>
                                    <button key={i} onClick={()=>removeBlock(i)} >
                                        remove
                                    </button>
                                </td>
                            </td>
                        )}
                        </tbody>
                    </table>
                    <form onSubmit={addBlock}>
                        <label htmlFor='submission-add-block'>
                            Block Size (kWh):
                        </label>
                        <input
                            id='submission-add-block'
                            type='number'
                            value={newBlockSizeKwh}
                            onChange={e=>{
                                setNewBlockCost(formatAsInteger(e.target.value);
                            }}
                        />
                        <label htmlFor='submission-add-block-cost'>
                            Block Size (kWh):
                        </label>
                        <input
                            id='submission-add-block-cost'
                            type='number'
                            value={newBlockCost}
                            onChange={e=>{
                                setNewBlockCost(formatAsCurrency(e.target.value));
                            }}
                        />
                        <button type='submit'>Add Block</button>
                    </form>
                </>
            }
        </div>
    )
}