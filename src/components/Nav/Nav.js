import React from 'react';
import {useLocation} from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {AppBar, Tabs, Tab} from '@material-ui/core';
import a11yProps from '../../modules/a11yProps';

export default function Nav(props){
  const [value, setValue] = React.useState(0);
  const {pathname} = useLocation();
  React.useEffect(()=>{
    console.log(pathname);
    switch(pathname){
      default:
        setValue('/admin/home');
        break;
    }
  } ,[pathname]);

  return(
    <AppBar>
      <Tabs value={value} onChange={(e, v)=>setValue(v)}>
        <Tab
          aria-label="home"
          value={'/admin/home'}
          {...a11yProps(0)}
          label='Home'
        />
      </Tabs>
    </AppBar>
  );
};

/*
    <AppBar position="static" color="default">
      <Tabs
        value={activeTab}
        onChange = {(e, v)=>setActiveTab(v)}
        variant="fullWidth"
      >
        <Tab aria-label="Profile" icon={<AccountCircleIcon />} value={0} href="#home" {...a11yProps(0)} />
        <Tab aria-label="User Search" icon={<SearchIcon />} value={1} href="#search" {...a11yProps(1)} />
        <Tab aria-label="Connections" icon={<HowToRegIcon />} value={2} href="#connections" {...a11yProps(2)} />
        <Tab aria-label="Available" icon={<RecentActorsIcon />} value={3} href="#available" {...a11yProps(3)} />
      </Tabs>
    </AppBar>
*/