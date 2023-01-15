import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

function SpecificsDialog (props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
          <Button onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>

    </Dialog>
  );
}

export default SpecificsDialog;