import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: red;
  height: 100%;
`;

const Stepper = styled.div`

`;

const StepBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Step = styled.button`
  width: ${props=>(1/props.num)*100}%;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  height: 100px;
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

const steps = [
  {name: 'Source'},
  {name: 'Pricing'},
  {name: 'Contract'},
  {name: 'Details'},
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
    </Container>
  )
}