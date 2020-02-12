import React, {useState, useEffect} from 'react';
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

const ProductionButton = styled.button`
    color: ${props=>(props.live? 'var(--color-primary)' : '#A53535')};
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    font-size: 1rem;
    transition: all .2s;
    &:hover {
        color: ${props=>(props.live? 'var(--color-primary-bright)' : '#333')};
        transform: scale(1.05);
        cursor: pointer;
    }
`;

function Program({program}){
  const {name, id} = program;
  const dispatch = useDispatch();
  const [production, setProduction] = useState(program.production);
  useEffect(()=>{
    setProduction(program.production);
  }, [program]);

  const onProductionClick = () => {
    dispatch({
      type: 'EDIT_PROGRAM',
      payload: { id, production: production ? 0 : 1 }
    });
    setProduction(!production);
  }

  return(
    <p>
      {name || `Unnamed Program (ID #${id})`}
      <ProductionButton
        onClick={onProductionClick}
        live={production}
      >
        {production ? 'Active' : 'Inactive'}
      </ProductionButton>
    </p>
  )
}

export default function UtilityModal(props){
    const dispatch = useDispatch();
    const utility = useSelector(state => state.adminRecordsModalUtility);
    const {
      eia_state, utility_name,
      zips, state, program_count,
      programs, utility_id
    } = utility;
    const [production, setProduction] = useState(utility.production);
    useEffect(()=>{
      setProduction(utility.production);
    }, [utility.production]);

    const open = useSelector(state => state.adminRecordsModalOpen);

    const close = () => {
        dispatch({type: 'SET_ADMIN_RECORDS_MODAL_OPEN', payload: false});
    }

    const toggleProduction = () => {
      dispatch({
        type: 'SET_UTILITY_PRODUCTION',
        payload: {
          id: utility_id,
          production: !production,
          page: props.page,
          search: props.search
        }
      });
      setProduction(!production);
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
            Programs for {utility_name} - <ProductionButton
              live={production}
              onClick={toggleProduction}
            >{production?'Active':'Inactive'}</ProductionButton>
          </ProgramTitle>
        </DialogTitle>
        <DialogContent>
          <p>EIA - State: {eia_state}</p>
          <h3>Programs:</h3>
          <List>
            {programs && programs.map(program =>
              <Program program={program} key={program.id} />
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