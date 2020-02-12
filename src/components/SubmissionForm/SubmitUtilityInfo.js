import React, {useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  input {
    text-align: center;
  }

  label {
    text-align: center;
  }

  select {
    max-width: 100px;
  }
`;

const BasicBox = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  .rate-title {
    text-align: center;
  }
`;

const ZipBox = styled.div`
  min-width: 50%;
  text-align: center;
  border-left: 2px dashed #DDD;
  box-sizing: border-box;
  padding: 16px;


  ul {
    list-style: none;
    text-align: left;
    display: inline-block;
    padding: 0;
    height: 350px;

    background-color: #DDD;
    border-radius: 8px;
    box-shadow: inset 0 1px 0px 1px rgba(0,0,0,.1);
    padding: 8px 16px;
    width: 200px;

    

    button {
      border: none;
      outline: none;
      cursor: pointer;
      background: none;
      color: gray;
      &:hover {
        color: red;
      }
    }
  }
  
`;

const RateBox = styled.div`
  display: grid;
  grid-template-areas: "t1 t2" "f1 f2";
  text-align: center;
  margin-bottom: 16px;
  background-color: #DDD;
  border-radius: 8px;
  box-shadow: inset 0 1px 0px 1px rgba(0,0,0,.1);
  padding: 8px 0;

  input {
    margin: 0 8px;
    
  }
  

  label:first-child {
    grid-area: t1;
  }
  label:nth-child(2) {
    grid-area: t2;
  }
  input:first-child {
    grid-area: f1;
  }
  input:nth-child(2) {
    grid-area: f2;
  }
`;

const LocationBox = styled.div`
  margin: 16px 0;
`;

const EiaBox = styled.div`
  display: inline-block;
`;

const PopUpContent = styled.div`
  max-width: 500px;
  width: 100%;
`;

const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

export default function SubmitUtilityInfo() {

  const [zipInput, setZipInput] = useState('');
  const [zips, setZips] = useState([555,555,555]);
  const [state,setState] = useState('State');
  const [utility_name, setUtility_name] = useState('');
  const [eiaid,setEiaid] = useState('');

  const [deleteZip, setDeleteZip] = useState(-1);

  const [comm_bundled, setComm_bundled] = useState('');
  const [comm_delivery, setComm_delivery] = useState('');

  const [ind_bundled, setInd_bundled] = useState('');
  const [ind_delivery, setInd_delivery] = useState('');

  const [res_bundled, setRes_bundled] = useState('');
  const [res_delivery, setRes_delivery] = useState('');

  function renderStates() {
    return states.map( (item,i)=>{
      return (
        <option value={item} key={i}>
          {item}
        </option>
      )
    });
  }

  function renderZips() {
    return zips.map( (item,i)=>{
      return (
      <li key={i}>
        <button onClick={()=>setDeleteZip(i)}><FontAwesomeIcon icon={faTimes}/></button>
        {item} 
        </li>
      );
    })
  }

  function submitZip(event) {
    event.preventDefault();
    setZips([...zips,zipInput]);
    setZipInput('');
  }

  function removeZip() {
    let copy = [...zips];
    copy.splice(deleteZip,1);
    setDeleteZip(-1);
    setZips(copy);
  }

  return (
    <Container>

      <BasicBox>
        <h3>Basic Info</h3>
        <label>Utility Name: </label>
        <input 
          type="text" 
          placeholder="Enter the name of the utility company"
          value={utility_name}
          onChange={event=>setUtility_name(event.target.value)}
          />
        
        <LocationBox>
          <EiaBox>
            <label>EIA ID: </label>
            <input 
              type="text" 
              placeholder="Enter the EIA ID"
              value={eiaid}
              onChange={event=>setEiaid(event.target.value)}
              />
          </EiaBox>

          <select value={state} onChange={event=>setState(event.target.value)}>
            <option disabled>State</option>
            {renderStates()}
          </select>
        </LocationBox>
        

        <label className="rate-title">Commercial Rates</label>
        <RateBox>
          <label>Bundled</label>
          <input type="number" value={comm_bundled} onChange={event=>setComm_bundled(event.target.value)}/>
          <label>Delivery</label>
          <input type="number" value={comm_delivery} onChange={event=>setComm_delivery(event.target.value)}/>
        </RateBox>

        <label className="rate-title">Individual Rates</label>
        <RateBox>
          <label>Bundled</label>
          <input type="number" value={ind_bundled} onChange={event=>setInd_bundled(event.target.value)}/>
          <label>Delivery</label>
          <input type="number" value={ind_delivery} onChange={event=>setInd_delivery(event.target.value)}/>
        </RateBox>

        <label className="rate-title">Residential Rates</label>
        <RateBox>
          <label>Bundled</label>
          <input type="number" value={res_bundled} onChange={event=>setRes_bundled(event.target.value)}/>
          <label>Delivery</label>
          <input type="number" value={res_delivery} onChange={event=>setRes_delivery(event.target.value)}/>
        </RateBox>
      </BasicBox>

      <ZipBox>
        <h3>Zip Codes</h3>
        <form onSubmit={submitZip}>
          <input type="number" placeholder="Enter zip code" value={zipInput} onChange={event=>setZipInput(event.target.value)}/>
          <button>Add Zip</button>
        </form>

        <ul>
          {renderZips()}
        </ul>
      </ZipBox>

      <Dialog open={(deleteZip!==-1)}>
        <PopUpContent>
          <DialogTitle>{(deleteZip!==-1? <span>Delete ZIP {zips[deleteZip]}?</span> : <span>Delete ZIP</span>)}</DialogTitle>
        
          <button className="button-negative" onClick={removeZip}>Delete</button>
          <button className="button-default" onClick={()=>setDeleteZip(-1)}>Cancel</button>
        </PopUpContent>
      </Dialog>

    </Container>
  )
}