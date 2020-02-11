import React, {useState} from 'react';
import styled from 'styled-components';

import EnergyBar from '../EnergyBar/EnergyBar';

const Container = styled.div`
  h2 {
    text-align: center;
  }
`;

const SourceBox = styled.div`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
`;

const SourceItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  input[type="number"] {
    text-align: right;
  }
  margin: 8px 0;
`;

const EnergyBox = styled.div`
  width: 100%;
  height: 32px;
`;

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


export default function SubmitSources() {


  const [sourceList, setSourceList] = useState([
    {name: 'wind', value: 0, active: false},
    {name: 'solar', value: .2, active: false},
    {name: 'bio', value: 0, active: false},
    {name: 'hydro', value: 0, active: false},
    {name: 'geo', value: 0, active: false},
    {name: 'other', value: 0, active: false},
  ]);

  function changeSourceList(index, target, value) {
    let copy = [...sourceList];
    copy[index][target] = value;
    setSourceList(copy);
  }

  function renderSources() {
    return sourceList.map( (item,i)=>{
      return (
        <SourceItem key={i}>
          <input type="checkbox" checked={sourceList[i].active} onChange={event=>changeSourceList(i,'active',event.target.checked)}/>
          <label>{capitalize(item.name)}</label>
          <input type="number" value={sourceList[i].value*100} onChange={event=>changeSourceList(i,'value',event.target.value/100)}/>
          <label>%</label>
        </SourceItem>
      )
    });
  }

  let count = 0;

  return (
    <Container>
      <h2>Sources</h2>
      {JSON.stringify(sourceList)}
      <EnergyBox>
        <EnergyBar sourceList={sourceList} key={Math.random} program={{
          wind: sourceList[0].value,
          solar: sourceList[1].value,
          bio: sourceList[2].value,
          hydro: sourceList[3].value,
          geo: sourceList[4].value,
          other: sourceList[5].value
          }}/>
      </EnergyBox>
      <SourceBox>
        {renderSources()}
      </SourceBox>
    </Container>
  )
}