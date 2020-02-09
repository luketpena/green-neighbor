import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
  height: 50px;
  background-color: var(--color-primary);
  display: grid;
  grid-template-areas: "buttons logout";
  grid-template-columns: 1fr auto;
`;

const ButtonBox = styled.div`
  grid-area: buttons;
  display: flex;
  flex-wrap: wrap;
`;

const LogOutButton = styled.button`
  grid-area: logout;
`;

const NavButton = styled.button`
  width: 100%;
  max-width: 100px;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 1em;
  transition: all .2s;
  border-bottom: ${props=>(props.select===props.index? '4px solid var(--color-primary-light)': '0px solid var(--color-primary-light)')};
  &:hover{
    background-color: var(--color-primary-light);
    cursor: pointer;
  }
`;

export default function NavBar() {

  const [value, setValue] = useState(0);
  const {pathname: currentURL} = useLocation();
  const history = useHistory();

  const tabs = [
    {name: 'Home', link: '/admin/home'},
    {name: 'Tickets', link: '/admin/tickets'},
    {name: 'Records', link: '/admin/records'},
    {name: 'Users', link: '/admin/manageAdmins'},
  ];

  React.useEffect(()=>{
    let i = 0;
    for(; i < tabs.length; i++){
      if(currentURL === tabs[i].link){
        setValue(i);
        break;
      }
    }
    if(i === tabs.length) setValue(0);
  }, [currentURL]);


  function renderTabs() {
    return tabs.map( (item,i)=>{
      return <NavButton key={i} onClick={()=>history.push(item.link)} select={value} index={i}>{item.name}</NavButton>
    })
  }

  return (
    <Container>
      <ButtonBox>
        {renderTabs()}
      </ButtonBox>
      <LogOutButton>Log Out</LogOutButton>
    </Container>
  )
}