import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: red;
  display: flex;
`;

const Bar = styled.div`
  background-color: ${props=>props.bar.color};
  width: ${props=> ( props.select===-1? props.bar.value*100 : (props.select===props.index? 100 : 0) )}% ;
  color: ${props=> (props.select===props.index? `white` : (props.select===-1? (props.bar.value>.1? `white` : `rgba(255,255,255,0)`) : `rgba(255,255,255,0)`) )};
  transition: width .5s, filter .2s, color .7s;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }
`;

export default function EnergyBar(props) {

  const [energy] = useState([
    {name: 'Wind', value: props.program.wind, color: 'skyblue'}, 
    {name: 'Solar', value: props.program.solar, color: 'orange'}, 
    {name: 'Bio', value: props.program.bio, color: 'limegreen'}, 
    {name: 'Hydro', value: props.program.hydro, color: 'dodgerblue'}, 
    {name: 'Geo', value: props.program.geo, color: 'orangered'}, 
    {name: 'Other', value: props.program.other, color: 'rebeccapurple'}]);
  const [hover] = useState(-1);
  const [select,setSelect] = useState(-1);

  function sortEnergy() {
    let copy = [];
    
    for (let i=0; i<energy.length; i++) {
      if (energy[i].value) {
        //Pushing to the start when it is the first source
        if (copy.length===0) {
          copy.push(energy[i]);
        } else {
          for (let j=0; j<copy.length; j++) {
            if (copy[j].value<energy[i].value) {
              copy.splice(j,0,energy[i]);
              break;
            } else if(j===copy.length-1) {
              copy.push(energy[i]);
              break;
            }
          }
        }
      }
    }
    return copy;
  }

  function renderBars() {
    return sortEnergy().map( (item,i)=>{
    return <Bar bar={item} key={i} select={select} index={i} onClick={()=>setSelect(i)} onMouseLeave={()=>setSelect(-1)}>{item.name} {item.value*100}%</Bar>
    })
  }

  function generateColumns() {
    const myEnergy = sortEnergy();
    let columnString = ``;
    for (let i=0; i<myEnergy.length; i++) {
      if (hover===i) {
        columnString += `auto `;
      } else {
        columnString += `${myEnergy[i].value*100}fr `;
      }
    }
    return columnString;
  }

  return (
    <Container gridColumns={generateColumns()}>
     {renderBars()}
    </Container>
  )
}