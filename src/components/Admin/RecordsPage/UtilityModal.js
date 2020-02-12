import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// 014212442

const ProgramTitle = styled.span`
  display: block;
  min-width: 500px;
`;

const List = styled.div`
  margin: 1rem;
`;

export default function UtilityModal(props){
    const dispatch = useDispatch();
    const {
        eia_state, utility_name,
        zips, state, program_count,
        programs
    } = useSelector(state => state.adminRecordsModalUtility);
    const open = useSelector(state => state.adminRecordsModalOpen);
    console.log({eia_state, utility_name, zips, state, program_count,
        programs});
    const close = () => {
        dispatch({type: 'SET_ADMIN_RECORDS_MODAL_OPEN', payload: false});
    }
 
    return (
        <Dialog
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="dialog"
        >
        <DialogTitle id="alert-dialog-title">
          <ProgramTitle>
            Programs for {utility_name}
          </ProgramTitle>
        </DialogTitle>
        <DialogContent>
          <p>EIA - State: {eia_state}</p>
          <h3>Programs:</h3>
          <List>
            {programs && programs.map(({name, id})=>
              <p key={id}>
                {name || `Unnamed Program (ID #${id})`}
              </p>
            )}
          </List>
          <h3>Active Zips:</h3>
          <List>
            <p>
              {zips && zips.map(a => a.zip).join(', ')}
            </p>
          </List>
        </DialogContent>
        <DialogActions>
          <button className="button-default" onClick={close} >
            Close
          </button>
        </DialogActions>
        </Dialog>
    )
}