import React from 'react';
import {useLocation} from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {AppBar, Tabs, Tab} from '@material-ui/core';

export default function Nav(props){
  const [value, setValue] = React.useState(0);
  const {pathname} = useLocation();
  React.useEffect(()=>{
    switch(pathname){
      case '/admin/home':
        setValue(0);
        break;
      default:
        break;
    }
  } ,[pathname]);
  return(
    <AppBar>
    </AppBar>
  );
};
