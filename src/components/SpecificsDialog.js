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

  getLabel = (label) => label ? label.toLowerCase() : '';

  generateRadioButtons = () => {
    let options;

    if(this.props.selected && this.props.selected.specifics) options = this.props.selected.specifics
    else if (this.props.redirect && this.props.redirect.specifics) options = this.props.redirect.specifics


    if(options) {
      return options.map((item) => (
        <FormControlLabel 
          key={item.label} 
          value={item.value} 
          control={<Radio />} 
          label={item.label} 
          onClick={() => this.props.onClose({
            label: this.props.selected.label || null,
            redirect: this.props.redirect ? this.props.redirect.label : null,
            base: this.props.redirect ? this.props.redirect.meaning : this.props.selected.meaning,
            extra: item.value
          })} 
        />)
      )  
    }
    // const specifics = 

  }

  render () {
    console.log('redirect:', this.props.redirect || '')
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
          { this.props.redirect && (
            <span>In this case, <strong>{this.getLabel(this.props.selected.label)}</strong> has the same interpretation as the symbol <strong>{this.getLabel(this.props.redirect.label)}</strong>.</span>
          )}
          <span>Did you do or see any of the following scenarios in your dream?</span>
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