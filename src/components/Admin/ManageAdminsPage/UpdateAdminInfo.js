import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    backButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  export default function UpdateAdminInfo(props) {
    const [username, setAdminUsername] = useState('');
    const [password, setAdminPassword] = useState('');
    const dispatch = useDispatch();
    

   

    useEffect( () => {
        setAdminUsername(username);
    }, [username]);

    useEffect( () => {
        setAdminPassword(password);
    }, [password]);

    // Function allows a Logged in Admin to update ONLY their own info.
    const updateAdmin = () => {
        console.log('start updateAdmin');
        dispatch({ type: 'UPDATE_ADMIN_INFO', payload: {username, password}});
        props.close();
    };

    return (
        <div>
            <Dialog  aria-labelledby="customized-dialog-title" open={props.open}>
            <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                Update your Admin Info
            </DialogTitle>
            <DialogContent dividers>
                <form>
                    <input
                        
                        type="text"
                        label="New Username"
                        placeholder="New Username"
                        value={username}
                        onChange={e=>setAdminUsername(e.target.value)}
                    />
                    <input
                    
                        type="text"
                        label="New Password"
                        placeholder="Don't Share Your Password!"
                        value={password}
                        onChange={e=>setAdminPassword(e.target.value)}
                    />
                </form>
                
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={updateAdmin}  color="primary">
                Save Changes
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
  }