import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import UtilityCard from './UtilityCard';

const EmptyCompanyDiv = styled.div`
  text-align: center;
  p, h3 {
    margin: 4px;
  }
`;

const UtilityCardBox = styled.div`
  grid-area: programs;
  width: 90%;
  margin: 64px auto;
`;

const Container = styled.div`
  background-color: var(--color-bkg-main);
  border-radius: 15% 15% 0 0;
  box-shadow: 0 0 32px 0 rgba(0,0,0,1);
`;


export default function UtilityList() {

  const programs = useSelector(state=>state.programs);

  function renderUtilities() {
    if (programs.length>0) {
      return programs.map( (item,i)=>{
        return <UtilityCard key={i} company={item}/>
      });
    } else {
      return <EmptyCompanyDiv>
        <h2>Uh, oh.</h2>
        <h3>It looks like there are no utility companies listed in your area!</h3>
        <p>Help out your community by letting us know what companies are nearby.</p>
        <button className="button-primary">Report missing utility company</button>
      </EmptyCompanyDiv>
    }
  }

  return (
    <Container>
      <UtilityCardBox>
        {renderUtilities()}
      </UtilityCardBox>
    </Container>
  )
}