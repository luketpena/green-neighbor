import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

const BasicBox = styled.div`
  background-color: red;
  min-width: 50%;
`;

const ZipBox = styled.div`
  background-color: blue;
  min-width: 50%;
`;

const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

export default function SubmitUtilityInfo() {



  function renderStates() {
    return states.map( (item,i)=>{
      return (
        <option value={item} key={i}>
          {item}
        </option>
      )
    });
  }

  return (
    <Container>

      <BasicBox>
        <label>Utility Name</label>
        <input type="text" />

        <select>
          <option disabled>State</option>
          {renderStates()}
        </select>

        <label>EIAID</label>
        <input type="text" />
      </BasicBox>

      <ZipBox>
        
      </ZipBox>

    </Container>
  )
}