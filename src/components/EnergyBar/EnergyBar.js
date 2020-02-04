import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: black;
  height: 100%;
  color: red;
  display: flex;
`;

const Bar = styled.div`
  background-color: ${props=>props.bar.color};
  width: ${props=>props.bar.value*100}%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
`;

export default function EnergyBar(props) {

  const [energy, setEnergy] = useState([
    {name: 'Wind', value: props.program.wind, color: 'skyblue'}, 
    {name: 'Solar', value: props.program.solar, color: 'orange'}, 
    {name: 'Bio', value: props.program.bio, color: 'limegreen'}, 
    {name: 'Hydro', value: props.program.hydro, color: 'dodgerblue'}, 
    {name: 'Geo', value: props.program.geo, color: 'orangered'}, 
    {name: 'Other', value: props.program.other, color: 'rebeccapurple'}]);
  const [hover,setHover] = useState(-1);

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
      return <Bar bar={item} key={i}>{item.name}</Bar>
    })
  }

  function barEnter(index) {
    setHover(index);
  }
  function barLeave(index) {
    if (hover===index) {
      setHover(-1);
    }
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