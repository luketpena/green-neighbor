import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ProgramTitle = styled.span`
  display: block;
  min-width: 500px;
`;

export default function UtilityModal(props){
    const dispatch = useDispatch();
    const {eia_state, utility_name, zips, state, program_count,
        program_list, program_id} = useSelector(state => state.adminRecordsModalUtility);
    const open = useSelector(state => state.adminRecordsModalOpen);
    console.log({eia_state, utility_name, zips, state, program_count,
        program_list, program_id});
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
          <table className='admin-table'>
            <thead>
              <tr>
                <th>
                  Company
                </th>
                <th>
                  EIA-State
                </th>
              </tr>
            </thead>
          </table>
        </DialogContent>
        <DialogActions>
          <button className="button-default" onClick={close} >
            Close
          </button>
        </DialogActions>
        </Dialog>
    )
}