import React, { Component } from 'react';
import { Dialog, DialogTitle, FormControlLabel, Radio, DialogContent, FormControl, RadioGroup } from '@mui/material';
import './SpecificsDialog.css';

class SpecificsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      choice: null,
    };
  }

  getLabel = () => this.props.selected && this.props.selected.label ? this.props.selected.label.toLowerCase() : '';

  generateRadioButtons = () => {
    console.log()
    if(this.props.selected && this.props.selected.specifics) {
      return this.props.selected.specifics.map((item) => (
        <FormControlLabel 
          key={item.label} 
          value={item.value} 
          control={<Radio />} 
          label={item.label} 
          onClick={() => this.props.onClose({
            label: this.props.selected.label || null,
            base: this.props.selected.meaning || null,
            extra: item.value
          })} 
        />)
      )
    }
  }

  render () {
    return (
      <Dialog 
        onClose={() => this.props.onClose({
          label: this.props.selected.label || null,
          base: this.props.selected.meaning || null,
        })} 
        open={this.props.open}
      >
        <DialogTitle>Tell me more</DialogTitle>
        <DialogContent className="radio-container">
          <span>When thinking about the symbol <strong>{this.getLabel()}</strong> in your dream, did you ... ?</span>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="none"
              name="radio-buttons-group"
            >
              {this.generateRadioButtons()}
              <FormControlLabel 
                key="none" 
                value="none" 
                control={<Radio />} 
                label="No, none of the above" 
                onClick={() => this.props.onClose({
                  label: this.props.selected.label || null,
                  base: this.props.selected.meaning || null,
                })} 
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  }

}

export default SpecificsDialog;