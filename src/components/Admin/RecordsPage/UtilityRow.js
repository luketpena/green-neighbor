import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Container = styled.tr`
  .production {
    color: ${props=>(props.production? 'green' : '#CCC')};
  }
  text-align: center;

  td:first-child {
    text-align: left;
    padding-left: 8px;
  }

`;


const ProgramBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  border-bottom: 1px solid #CCC;
  transition: all .2s;
  padding-left: 8px;
  &:hover {
    background-color: #EFEFEF;
  }
  .production {
    color: red;
  }
`;

const ProgramTitle = styled.span`
  display: block;
  min-width: 500px;
`;

export default function UtilityRow(props) {

  const dispatch = useDispatch();

  const {id, utility_name, zip, state, program_count, program_list, program_id, production} = props.utility;
  const [open, setOpen] = useState(false);

  function toggleProduction() {
    const myPayload = {id, production: !production, page: props.page, search: props.search};
    dispatch({type: 'SET_UTILITY_PRODUCTION', payload: myPayload});
  }

  const handleClose = () => {
    setOpen(false);
  };

  function clickProgramEdit(id) {
    console.log('Editing a program with id',id);
  }

  function renderPrograms() {
    if (program_count>0) {
      return program_list.map( (item,i)=>{
        return (
          <ProgramBox key={i}>
            <p>{(item? item : 'Untitled program')}</p>
            <button className="button-primary" onClick={()=>clickProgramEdit(program_id[i])}>Edit</button>
          </ProgramBox>
        )
      });
    } else {
      return (
        <p>This company has no listed programs.</p>
      )
    }
  }

  return (
    <Container className="utility-row" production={production}>

      <td>{utility_name}</td>
      <td>{state}</td>
      <td>{zip}</td>
      <td>{program_count} {(program_count==1? 'program' : 'programs')}</td>
      <td className="production">
        <span onClick={toggleProduction}>{(production? 'Live' : 'Inactive')}</span>
      
      </td>


      <td><button className="button-default" onClick={()=>setOpen(true)}>Details</button></td>
      <td><button className="button-default">Edit</button></td>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog"
      >
        <DialogTitle id="alert-dialog-title"><ProgramTitle>Programs for {utility_name}</ProgramTitle></DialogTitle>
        <DialogContent>
          
            {renderPrograms()}

        </DialogContent>
        <DialogActions>
          <button className="button-default" onClick={handleClose} >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

