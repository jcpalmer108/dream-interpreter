import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material';

function SpecificsDialog (props) {
  const { handleClose, selected, open } = props;

  const getLabel = () => selected && selected.label ? selected.label.toLowerCase() : '';

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Let's talk about your choice more...</DialogTitle>
      <DialogContent>When thinking about the symbol <strong>{getLabel()}</strong>, did any of these specific incidents come up?</DialogContent>
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