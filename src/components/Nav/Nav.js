import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Tabs, Tab, Toolbar} from '@material-ui/core';
import a11yProps from '../../modules/a11yProps';
import { useSelector, useDispatch } from 'react-redux';
import {makeStyles, Button} from '@material-ui/core';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonStyle = {
  color: 'white',
  whiteSpace: 'nowrap',
  marginLeft: '8px'
}

export default function Nav(props){
  const [value, setValue] = React.useState(0);
  const {pathname: currentURL} = useLocation();
  const dispatch = useDispatch();

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

  // if not logged in, return null
  const user = useSelector(state => state.user);
  if(!user.id){
    return null;
  }

  return(
    <AppBar position='sticky'>
      <Bar>
        <Tabs
          value={value}
          onChange={(e, v)=>setValue(v)}
        >
          {tabs.map(({name, link}, i) => 
            <Tab
              key={i}
              aria-label={name}
              value={i}
              label={name}
              {...a11yProps(i)}
              to={link}
              component={Link}
            />
          )}
        </Tabs>
        <Button
          onClick={() => dispatch({ type: 'LOGOUT' })}
          style={ButtonStyle}
        >
          Log Out
        </Button>
      </Bar>
    </AppBar>
  );
};