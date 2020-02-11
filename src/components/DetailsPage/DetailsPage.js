import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';

import Background from '../../images/bkg-forest-top.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faScroll, faSeedling, faExclamation, faHandsHelping, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import HomeButton from '../HomeButton/HomeButton';

const ActionData = [
  {action: 'share', text: `Share with Friends`, icon: faBullhorn},
  {action: 'utility', text: `View other energy programs near you`, icon: faScroll},
  {action: 'about', text: `Discover Green Energy's Impact`, icon: faSeedling},
  {action: 'report', text: `Report a problem with this energy program`, icon: faExclamation},
  {action: 'contribute', text: `Discover how you can contribute`, icon: faHandsHelping}
];

const Container = styled.div`
  width: auto;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-areas: "home" "main" "action";
  grid-template-rows: auto 1fr auto;
  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  overflow: hidden;
`;

const appear_step1 = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;
const appear_step2 = keyframes`
  0% {opacity: 0;}
  50% {opacity: 0;}
  100% {opacity: 1;}
`;

const TitleDiv = styled.div`
  grid-area: main;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 0 0 4px black;
  h1 {
    font-family: var(--font-header);
    font-size: 96px;
    margin: 0;
    margin-bottom: 32px;
  }
  h2 {
    font-family: var(--font-main);
    margin: 8px;
    font-size: 16px;
  }
  h3 {
    font-family: var(--font-main);
    margin: 4px;
    font-size: 24px;
  }
  p {
    margin: 0;
    font-family: var(--font-main);
  }
  
  
`;



const BottomDisplay = styled.div`
  grid-area: action;
  display: flex;
  margin: px auto;
  padding-right: px;
  justify-content: center;
  align-content: center;
  backdrop-filter: blur(4px);
  border-top: 4px dashed white;
  position: relative;
  transition: height .5s;
  height: ${props=>(props.active? `200px` : `0px`)};
`;




const ActionCard = styled.button`
  
  text-align: center;
  width: 20%;
  padding: 16px;
  background-color: rgba(255,255,255,.1);
  color: rgba(255,255,255,.8);

  transition: all .3s;
  border: none;
  outline: none;
  font-size:  1em;
  
  
  p {
    font-family: var(--font-main);
    text-shadow: 0 0 8px black;
    display: block;
  }
  .icon {
    display: block;
    margin: 16px auto;
    font-size: 48px;
    transition: transform 1s;
  }
  &:hover, &:focus {
    cursor: pointer;
    background-color: rgba(255,255,255,.2);
    color: rgba(255,255,255,1);
    .icon {
      transform: scale(1.4);
    }
  }
`;

const TitleMain = styled.div`
  animation: 1s ${appear_step1} ease-in;
`;
const TitleAction = styled.div`
  animation: 2s ${appear_step2} ease-in;
`;

const DiscoverBar = styled.div`
  .discoverButton {
    margin: 0 auto;
    display: block;
    background: none;
    outline: none;
    color: white;
    font-family: var(--font-header);
    font-size: 32px;
    border: none;
    p {
      margin: 0;
      transition: all 1s;
    }
    .icon {
      transform: scale(1) rotate(${props=> (props.active? `180deg` : `0`)});
      transition: transform .2s;
      transition-timing-function: cubic-bezier(.17,.67,.67,1.59);
    }
    &:hover {
      cursor: pointer;
      .icon {
        transform: scale(1.5) rotate(${props=> (props.active? `180deg` : `0`)});
      }
      p {
        transform: scale(1.2);
      }
    }
  }
`;


export default function DetailsPage() {

  const details = useSelector(state => state.programDetails)
  const history = useHistory();
  const dispatch = useDispatch();
  const {id, zip} = useParams(); 
  let [discoverActive, setDiscoverActive] = useState(false);  


  useEffect(()=>{
    dispatch({type: 'GET_PROGRAM_DETAILS', payload: id});
  }, [id]);

  function blurActions(event) {
    event.target.blur();
  }

  function clickAction(action) {
    switch(action) {
      case 'utility': history.push(`/utility/${zip}`); break;
      case 'about': history.push('/about'); break;
      case 'report': history.push(`/report/${zip}/${details.eia_state}/${details.id}`); break;
      default: /* Always remember: keep React happy with default cases. */ break;
    }
  }

  function renderActions() {
    return ActionData.map( (item,i)=>{
      return (
        <ActionCard key={i} onMouseLeave={blurActions} onClick={()=>clickAction(item.action)}>
          <FontAwesomeIcon className="icon" icon={item.icon}/>
          <p>{item.text}</p>
        </ActionCard>
      )
    });
  }
  

  return(
    <Container>
      <HomeButton />
      <TitleDiv>
        <TitleMain>
          <h2>{details.utility_name} - {details.eiaid}</h2>
          <h1>{details.program_name}</h1>
          <h3>You're one step closer to green energy.</h3>
        </TitleMain>
        <TitleAction>
          <p>Continue to the program website to sign up!</p>
          <a href = {details.sign_up_url}>
          <button className= "button-primary"> {details.sign_up_text || 'Go!'} </button>
          </a>
        </TitleAction>
      </TitleDiv>

      <DiscoverBar active={discoverActive}>
        <button className="discoverButton" onClick={()=>setDiscoverActive(!discoverActive)}>
          <p>Discover More</p>
          <FontAwesomeIcon className="icon" icon={faCaretUp} />
        </button>
        <BottomDisplay active={discoverActive}>
          {renderActions()}
        </BottomDisplay> 
      </DiscoverBar>

    </Container>
  )
}