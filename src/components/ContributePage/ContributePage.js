import React from 'react';
import styled from 'styled-components';
import Background from '../../images/bkg-forest-top.jpg';
// fancy home button
import HomeButton from '../HomeButton/HomeButton';
// material-ui
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box p={3}>{children}</Box>}
//     </Typography>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles(theme => ({
//     tabs: {
//       borderRight: `1px solid ${theme.palette.divider}`,
//     },
//   }));

  const BackgroundBox = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
`;

const Container = styled.div`
width: 90%;
height: 500px;
margin: 0 auto;
display: grid;
grid-template-areas: "menu details";
grid-template-rows: 100px 1fr;
grid-template-columns: 250px 850px;
// justify-content: center;
`;

const Header = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  
color: white;
text-shadow: 0 0 4px black;
h1 {
  font-family: var(--font-header);
  font-size: 64px;
  margin: 0;
}
`;

const Menu = styled.div`
grid-area: menu;
height: 400px;
grid-row: 2;
display: flex;
flex-direction: column;
align-items: right;
`;

const Details = styled.div`
grid-area: details;
grid-row: 2;

height: 400px;
overflow: scroll;
opacity: .82;
`;
const Div = styled.div`
padding: 15px 0px 15px;
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
`;

export default function ContributePage() {
    // const classes = useStyles();
    // const [value, setValue] = React.useState(0);
  
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
  return(
      <BackgroundBox>
        <HomeButton/>
        <Header>
            <h1>Contribute</h1>
        </Header>
        <Container >
             
               {/* <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    
                >
                    <Tab label="Provide Information" {...a11yProps(0)} />
                    <Tab label="Follow us on Social Media" {...a11yProps(1)} />
                    <Tab label="Make a Donation" {...a11yProps(2)} />
                </Tabs>*/}
            <Menu>
            <button className="button-primary" >Follow us on Socal Media</button>
            {/* <button className="button-primary" >Provide Information</button>
            <button className="button-primary" >Make a Donation</button> */}
            </Menu> 

            
            <Details className="container">
                {/* link to component or just have text */}
                {/* <TabPanel value={value} index={0}>
                    Information
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Socal Media Links
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Donation
                </TabPanel> */}
                <Div>
                    <h2>FOLLOW US ON SOCIAL MEDIA</h2>
                    <h3>AND SHARE US WITH YOUR NEIGHBORS</h3>
                </Div>
                {/* <Div>2</Div>
                <Div>
                    <h2>WE'RE A SMALL NON-PROFIT OPERTAION</h2>
                </Div> */}
            </Details>
        </Container>
    </BackgroundBox>
  )
}