import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, FormControlLabel, Radio, DialogContent, FormControl, RadioGroup } from '@mui/material';
import './SpecificsDialog.css';

function SpecificsDialog (props) {
  const { handleClose, selected, open } = props;

  const getLabel = () => selected && selected.label ? selected.label.toLowerCase() : '';

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Let's talk about your choice more...</DialogTitle>
      <DialogContent>When thinking about the symbol <strong>{getLabel()}</strong> in your dream, did any of these scenarios come up?</DialogContent>
      <FormControl className="radio-container">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
     </FormControl>


      
      <DialogActions>
        <Button onClick={handleClose}>Exit</Button>
        <Button onClick={handleClose} variant="contained" autoFocus>
          Submit
        </Button>
      </DialogActions>

    </Dialog>
  );
}

export default SpecificsDialog;