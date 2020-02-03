import React, {useState} from 'react';
import styled from 'styled-components';
import EnergyBar from '../EnergyBar/EnergyBar';


const ProgramCardBody = styled.div`
  margin: 8px 0;
  h4 {
    margin: 0;
  }
  height: ${props=>(props.detailsActive? '230' : '130')}px;
  overflow: hidden;
  transition: height .5s;
`;

const ProgramCardHeader = styled.div`
  background-color: var(--color-button-primary-main);
  color: white;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 16px;
  position: relative;
  z-index: 2;
  height: 30px;
`;

const ProgramCardMain = styled.div`
  background-color: var(--color-bkg-highlight);
  box-shadow: 0 2px 4px 2px rgba(0,0,0,.5);
  position: relative;
  z-index: 1;
  height: 100px;
`;

const ProgramCardDetails = styled.div`
  background-color: yellow;
  height: 100px;
  left: 0;
`;

const Container = styled.div``;

export default function ProgramCard(props) {

  let [detailsActive, setDetailsActive] = useState(false);

  return (
    <ProgramCardBody detailsActive={detailsActive}>
      <ProgramCardHeader>
        <h4>{props.program.program_name}</h4>
        <EnergyBar program={props.program}/>
      </ProgramCardHeader>

      <ProgramCardMain onClick={()=>setDetailsActive(!detailsActive)}>

      </ProgramCardMain>

      <ProgramCardDetails>

      </ProgramCardDetails>
    </ProgramCardBody>
  )
}