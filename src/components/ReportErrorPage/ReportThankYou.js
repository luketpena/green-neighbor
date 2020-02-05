import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

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
        

export default function ReportThankYou(props) {     

    return (
        <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Thank You for submitting a ticket!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Our Team at Green Neighbor Challenge will begin to look into this quickly and we'll update you when it's been processed!
          </Typography>
          <Typography gutterBottom>
            Your input and feedback is important to the Green Neighbor Project and every little bit of information you provide strengthens our community.
          </Typography>
          <Typography gutterBottom>
            If there is anything else you'd like to chime in on check out our <a href="https://www.facebook.com/GreenNeighborChallenge/" target="_blank">Facebook</a> and <a href="https://twitter.com/GreenNeighborCh" target="_blank">Twitter!</a> 
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}