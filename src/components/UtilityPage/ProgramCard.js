import React, {useState} from 'react';
import styled from 'styled-components';
import EnergyBar from '../EnergyBar/EnergyBar';


const ProgramCardBody = styled.div`
  margin: 8px 0;
  h4 {
    margin: 0 8px;
  }
  height: ${props=>(props.detailsActive? '348' : '198')}px;
  overflow: hidden;
  transition: height .5s;
`;

const ProgramCardHeader = styled.div`
  background-color: #CCC;
  color: white;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 16px;
  position: relative;
  z-index: 2;
  height: 48px;
`;

const ProgramCardMain = styled.div`
  background-color: var(--color-bkg-highlight);
  box-shadow: 0 2px 4px 2px rgba(0,0,0,.5);
  position: relative;
  box-sizing: border-box;
  z-index: 1;
  height: 150px;
  padding: 4px;
  text-align: center;
  p {
    margin: 8px auto;
    display: block;
  }
`;

const ProgramCardDetails = styled.div`
  background-color: #EEE;
  height: 150px;
  text-align: center;
  box-sizing: border-box;
  padding: 8px;
  p {
    margin: 8px auto;
    display: block;
  }
`;

const SelectButton = styled.button `
  margin: 0;
`;

const BarBox = styled.div`
  border-radius: 16px;
  overflow: hidden;
  margin: 0 16px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.5);
`;

const DetailsButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  outline: none;
  border: none;
  transition: background-color .2s;
  &:hover {
    cursor: pointer;
    background-color: #EEE;
  }
`;


export default function ProgramCard(props) {

  let [detailsActive, setDetailsActive] = useState(true);
  let [blockActive] = useState(( (props.program.blocks_available==='No' || props.program.blocks_available===null)? false : true))
  const [energy] = useState([
    {name: 'Wind', value: props.program.wind}, 
    {name: 'Solar', value: props.program.solar}, 
    {name: 'Bio', value: props.program.bio}, 
    {name: 'Hydro', value: props.program.hydro}, 
    {name: 'Geo', value: props.program.geo}, 
    {name: 'Other', value: props.program.other}]);
  const [attributes] = useState([
    {text: 'is Green-e Certified', value: (props.program.green_e==='Yes'? true : false)},
    {text: 'uses Retired Recs', value: (props.program.recs_retired==='Yes'? true : false)},
    {text: 'is Revenue Neutral', value: (props.program.revenue_neutral==='Yes'? true : false)},
  ]);

  function sortEnergy() {
    let copy = [];
    for (let i=0; i<energy.length; i++) {
      if (energy[i].value) {
        //Pushing to the start when it is the first source
        if (copy.length===0) {
          copy.push(energy[i]);
        } else {
          //Sort by comparing values and splicing into place
          for (let j=0; j<copy.length; j++) {
            if (copy[j].value<energy[i].value) {
              copy.splice(j,0,energy[i]);
              break;
            } else if(j===copy.length-1) {
              copy.push(energy[i]);
              break;
            }
          }
        } //END splicing in new values
      } //END check for value
    } //END looping through energy values
    return copy;
  }

  function renderSourceText() {
    let sourceString = 'This program uses ';
    const sourceList = sortEnergy();
    for (let i=0; i<sourceList.length; i++) {
      if (i===sourceList.length-1) {sourceString += 'and '}
      sourceString += `${sourceList[i].value*100}% ${sourceList[i].name}`;
      if (i<sourceList.length-1) {sourceString += ', ';} else {sourceString += ' power.'}
    }
    return sourceString;
  }

  function renderAttributeText() {
    let attributeString = '';
    for (let i=0; i<attributes.length; i++) {
     
      if (attributes[i].value) {
        if (attributeString.length===0) {
          attributeString += 'This program '
        } else if (i<attributes.length) {
          attributeString += ', '
          if (i===attributes.length-1) {
            attributeString += 'and '
          }
        }
        attributeString += attributes[i].text;
      }
    }
    if (attributeString.length>0) {attributeString += '.'};  
    return attributeString;
  }

  function renderBlockActive() {
    switch(blockActive) {
      case false: return 'Priced by Kilowatt-hour'; break;
      default: return 'Priced by Block'; break;
    }
  }

  function renderPricing() {
    let priceString = 'The price ';
    if (blockActive && props.program.block_cost) {
      let blockCostArray = props.program.block_cost.split(';');
      if (blockCostArray.length>1) {priceString += `starts at $${Number(blockCostArray[0]).toFixed(2)} per Kilowatt-hour.`}
      else {priceString += `is $${Number(blockCostArray[0]).toFixed(2)} per Kilwatt-hour.`}
    } else {
      priceString += `is $${Number(props.program.cost_kwh).toFixed(2)} per Kilwatt-hour.`;
    }
    return priceString
  }

  function renderBlockSize() {
    if (blockActive) {
      let blockString = '';
      let blockSizeArray = props.program.block_size_kwh.split(';');
      if (blockSizeArray.length>1) {blockString += `with block sizes starting at ${props.program.block_size_kwh.split(';')[0]} Kilowatt-hours`}
      else {blockString += `with ${props.program.block_size_kwh.split(';')[0]} Kilwatt-hours blocks`}
      return blockString
    }
  }

  function renderCredit() {
    switch(props.program.credit_yn) {
      case 'Yes': return <p>This program offers credit {(props.program.credit_kwh? <span>at ${props.program.credit_kwh} </span> : <></>)}per Kilwatt-hour</p>;
      case 'Included': return `This program offers credit included in the price.`;
      default: return ``
    }
  }

  return (
    <ProgramCardBody detailsActive={detailsActive}>
      <ProgramCardHeader>
        <h4>{props.program.program_name}</h4>
        <BarBox><EnergyBar program={props.program}/></BarBox>
        <SelectButton className="button-secondary">Select</SelectButton>
      </ProgramCardHeader>

      <ProgramCardMain >
          <p>{renderSourceText()}</p>
          <p>{renderAttributeText()}</p>
          <p>{renderBlockActive()}</p>
          <DetailsButton onClick={()=>setDetailsActive(!detailsActive)}>Pricing details</DetailsButton>
      </ProgramCardMain>

      <ProgramCardDetails>
        <p>{renderPricing()} {renderBlockSize()}</p>
        {renderCredit()}
      </ProgramCardDetails>
    </ProgramCardBody>
  )
}