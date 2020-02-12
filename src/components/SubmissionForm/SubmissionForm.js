import React, {useState} from 'react';
import styled from 'styled-components';

import SubmitSources from './SubmitSources';
import PricingForm from './PricingForm';
import SubmitDetails from './SubmitDetails';

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Stepper = styled.div`
  height: 50px;
`;

const StepBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

const Step = styled.button`
  width: ${props=>(1/props.num)*100}%;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  height: 100%;
  position: relative;
  font-size: 1em;
  color: ${props=>(props.currentStep===props.index? 'white' : 'black')};
  background-color: ${props=>(props.currentStep===props.index? '#1662BF' : 'white')};
  transition: all .2s;
  &:hover {
    cursor: pointer;
    background-color: ${props=>(props.currentStep===props.index? '#196BD1' : '#EEE')};;
  }
`;

const StepBubble = styled.div`
  width: ${props=>(props.currentStep===props.index? '24':'16')}px;
  height: ${props=>(props.currentStep===props.index? '24':'16')}px;
  background-color: ${props=>(props.currentStep>props.index? 'limegreen' : 'dodgerblue')};
  border-radius: 50%;
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: all, .3s;
  transition-timing-function: cubic-bezier(.17,.67,.57,2);
  transform: ${props=>(props.currentStep===props.index? 'translate(-12px, 14px)':'translate(-8px, 10px)')};
  z-index: 1;
`;

const ProgressBox = styled.div`
  height: 4px;
  background-color: #1662BF;
  position: relative;
  left: ${props=> (.5/props.num)*100}%;
  width: ${props=> 100-((1/props.num)*100)}%;
`;

const ProgressBar = styled.div`
  background-color: limegreen;
  width: ${props=> (props.currentStep/(props.num-1))*100}%;
  height: 100%;
  transition: all .5s;
`;

const FormBox = styled.div`
  display: grid;
  box-sizing: border-box;
  padding: 0 5%;
  
  grid-template-areas: "header" "main" "buttons";
  grid-template-rows: auto 1fr auto;
  h1 {
    grid-area: header;
    text-align: center;
  }
`;

const FormArea = styled.div`
  background-color: white;
  grid-area: main;
  border-radius: 16px;
  box-shadow: 0 8px 8px -4px rgba(0,0,0,.5);
`;

const FormButtons = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;

`;

const steps = [
  {name: 'Details', component: <SubmitDetails />},
  {name: 'Source', component: <SubmitSources />},
  {name: 'Pricing', component: <PricingForm /> },
  {name: 'Contract'},
  
];

export default function SubmissionForm() {

  const [currentStep, setCurrentStep] = useState(0);

  function renderSteps() {
    return steps.map( (item,i)=>{
      return (
        <Step key={i} num={steps.length} onClick={()=>setCurrentStep(i)} currentStep={currentStep} index={i}>
          {item.name}
          <StepBubble currentStep={currentStep} index={i}/>
        </Step>
      )
    });
  }

  function renderButtons() {
    if (currentStep===0) {
      if (currentStep===steps.length-1) {
        return <button className="button-primary">Submit</button>
      } else {
        return <button onClick={()=>setCurrentStep(currentStep+1)} className="button-default">Next</button>
      }
    } else {
      if (currentStep===steps.length-1) {
        return <>
          <button onClick={()=>setCurrentStep(currentStep-1)} className="button-default">Back</button>
          <button className="button-primary">Submit</button>
          </>
      } else {
        return <>
        <button onClick={()=>setCurrentStep(currentStep-1)} className="button-default">Back</button>
          <button onClick={()=>setCurrentStep(currentStep+1)} className="button-default">Next</button>
          </>
      }
    }
  }

  return (
    <Container>
      <Stepper>
        <StepBox>
          {renderSteps()}
        </StepBox>
        <ProgressBox num={steps.length}>
          <ProgressBar num={steps.length} currentStep={currentStep}/>
        </ProgressBox>
      </Stepper>
      <FormBox>
        <h1>Submission Form</h1>
        <FormArea>
          {steps[currentStep].component}  
        </FormArea>
        <FormButtons>
          {renderButtons()}
        </FormButtons>
      </FormBox>

    </Container>
  )
}