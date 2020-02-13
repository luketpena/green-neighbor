import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`;

const InputRow = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin: 8px;
`;

const Input = styled.div`
    & > * {
        margin: 0px 4px
    }
    margin: 4px
`;

const Text = styled.p`
    margin: 4px;
`;

const InputGrid = styled.form`
    margin: 4px;
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 4px;
`;

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

    const asCurrency = str => str.match(/[0-9]*\.?[0-9]{0,2}/)[0] || '';
    const asInteger = str => str.match(/[0-9]*/)[0] || '';

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
        setNewBlockCost('');
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
        <Container>
            <InputRow>
                <Input>
                    <label htmlFor='submission-cost-model'>
                        Cost Model:
                    </label>
                    <select
                        id='submission-cost-model'
                        value={costIsRange}
                        onChange={costModelToggle}
                    >
                        <option value={0}>Per kWh</option>
                        <option value={1}>Range</option>
                    </select>
                </Input>
                {costIsRange ?
                    <>
                        <Input>
                            <label htmlFor='submission-cost-min'>Min: </label>
                            <input
                                type="text"
                                onChange={e => setCostRangeMin(asCurrency(e.target.value))}
                                placeholder='5.00'
                                value={costRangeMin}
                                onBlur={()=>updateSubmissionForm({
                                    cost_range: `${costRangeMin}-${costRangeMax}`
                                })}
                            />
                        </Input>
                        <Input>
                            <label htmlFor='submission-cost-max'>Max: </label>
                            <input
                                type="text"
                                placeholder="10.00"
                                value={costRangeMax}
                                onChange={e => setCostRangeMax(asCurrency(e.target.value))}
                                onBlur={()=>updateSubmissionForm({
                                    cost_range: `${costRangeMin}-${costRangeMax}`
                                })}
                            />
                        </Input>
                    </> :
                    <Input> {/* END costIsRange === true, BEGIN costIsRange===false */}
                        <label htmlFor='submission-cost-kwh'>
                            Cost kWh:
                        </label>
                        <input
                            id='submission-cost-kwh'
                            type="text"
                            placeholder="2.00"
                            value={costKwh}
                            onChange={e => setCostKwh(asCurrency(e.target.value))}
                            step="0.01"
                            onBlur={e => updateSubmissionForm({
                                cost_kwh: costKwh, cost_range: undefined
                            })}
                        />
                    </Input>
                }
            </InputRow>
            <InputRow>
                <Input>
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
                </Input>
                {creditYesNo === 'Yes' && 
                    <Input>
                        <label htmlFor='submission-credit-kwh'>Credit / kWh: </label>
                        <input
                            id='submission-credit-kwh'
                            value={creditKwh}
                            type="text"
                            onChange={e => setCreditKwh(asCurrency(e.target.value))}
                            onBlur={e => updateSubmissionForm({credit_kwh: creditKwh})}
                            placeholder='2.99'
                        />
                    </Input>
                }
            </InputRow>
            <InputRow>
                <Input>
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
                </Input>
                {(blocksAvailable === 'Min' || blocksAvailable === 'Max') && 
                    <Input>
                        <label htmlFor='submission-blocks-available-min-max'>
                            {blocksAvailable} Blocks:&nbsp;
                        </label>
                        <input
                            id='submission-blocks-available-min-max'
                            type='text'
                            value={blocksAvailableMinMaxValue}
                            onChange={e=>{
                                setBlocksAvailableMinMaxValue(asInteger(e.target.value));
                            }}
                            onBlur={updateBlocksAvailable}
                        />
                    </Input>
                }
            {blocksAvailable !== 'No' &&
                <InputGrid onSubmit={addBlock}>
                    <label htmlFor='submission-add-block'>
                        Block Size (kWh):
                    </label>
                    <input
                        id='submission-add-block'
                        type='text'
                        placeholder='100'
                        value={newBlockCost}
                        onChange={e=> setNewBlockCost(asInteger(e.target.value))}
                    />
                    <label htmlFor='submission-add-block-cost'>
                        Block Cost:
                    </label>
                    <input
                        id='submission-add-block-cost'
                        type='text'
                        placeholder='5.00'
                        value={newBlockSizeKwh}
                        onChange={e=>{
                            setNewBlockSizeKwh(asCurrency(e.target.value));
                        }}
                    />
                    <br />
                    <button type='submit'>Add Block</button>
                </InputGrid>
            }
            {blocksAvailable !== 'No' &&
                <div>
                    <span>Blocks (kWh):</span>
                    {blockSizes.length ?
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
                                <tr key={i}>
                                    <td>
                                        {blockSize}
                                    </td>
                                    <td>
                                        {blockCosts[i]}
                                    </td>
                                    <td>
                                        <button key={i} onClick={()=>removeBlock(i)} >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    : <center>No Blocks Listed</center>
                    }
                </div>
            }
            </InputRow>
        </Container>
    );
}