import React from 'react';
import { Dialog, DialogTitle, DialogContent, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import './SpecificsDialog.css';

function SpecificsDialog ({ onClose, open, redirect, selected}) {
  const getLabel = (term) => term ? term.toLowerCase() : ''

  const generateRadioButtons = () => {
    let options = []

    console.log('redirect', redirect)
    console.log('selected', selected)

    if (selected && selected.specifics) {
      options = selected.specifics
    } else if (redirect) {
      options = redirect.specifics
    }

    const noneOfTheAboveButton = (<FormControlLabel 
      key="none" 
      value="none" 
      control={<Radio />} 
      label="No, none of the above" 
      onClick={() => this.props.onClose({
        label: selected.label,
        meaning: selected.meaning,
      })} 
    />)

    return options && options.map((option, index) => (
      <FormControlLabel 
        key={`specific ${index + 1}`} 
        value={option.value} 
        control={<Radio />} 
        label={option.label}
        onClick={() => onClose(redirect ? {
          label: selected.label,
          redirect: redirect.label,
          meaning: redirect.meaning,
          extra: option.value
        } : {
          label: selected.label,
          meaning: selected.meaning,
          extra: option.value
        })} 
      />
    )).concat(noneOfTheAboveButton)

  }

  return (
    <Dialog 
      onClose={() => onClose({
        label: this.props.selected.label || null,
        base: this.props.selected.meaning || null,
      })} 
      open={open}
      data-testid="dialog"
    >
      <DialogTitle>More information</DialogTitle>
      <DialogContent className="radio-container">
        { redirect && (
            <span>In this case, <strong>{getLabel(selected.label)}</strong> has the same interpretation as the symbol <strong>{getLabel(redirect.label)}</strong>.</span>
        )}
        <span>When it comes to the symbol <strong>{redirect ? getLabel(redirect.label) : getLabel(selected && selected.label)}</strong> in your dream, did you...</span>
        <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="none"
              name="radio-buttons-group"
            >
              {generateRadioButtons()}
            </RadioGroup>
          </FormControl>

      </DialogContent>
    </Dialog>
  );
}

export default SpecificsDialog;

/*
  // const generateRadioButtons = () => {
  //   let options;

  //   if(this.props.selected && this.props.selected.specifics) options = this.props.selected.specifics
  //   else if (this.props.redirect && this.props.redirect.specifics) options = this.props.redirect.specifics

  //   if(options) {
  //     return options.map((item) => (
  //       <FormControlLabel 
  //         key={item.label} 
  //         value={item.value} 
  //         control={<Radio />} 
  //         label={item.label} 
  //         onClick={() => this.props.onClose({
  //           label: this.props.selected.label || null,
  //           redirect: this.props.redirect,
  //           base: this.props.redirect ? this.props.redirect.meaning : this.props.selected.meaning,
  //           extra: item.value
  //         })} 
  //       />)
  //     )  
  //   }
  // }
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
            <span>In this case, <strong>{getLabel(this.props.selected.label)}</strong> has the same interpretation as the symbol <strong>{this.getLabel(this.props.redirect.label)}</strong>.</span>
          )}
          <span>Did you do or see any of the following scenarios in your dream?</span>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="none"
              name="radio-buttons-group"
            >
              {generateRadioButtons()}
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

            onClose={() => this.props.onClose({
        label: this.props.selected.label || null,
        base: this.props.selected.meaning || null,
      })} 

*/