import React, { Component } from 'react';
import { Autocomplete, Button, TextField, Chip } from '@mui/material';
import SpecificsDialog from './SpecificsDialog';
import symbols from '../content/data';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chosenSymbols: [],
      selected: null,
      open: false,
    };
  }

  handleAddSymbol = () => {
    this.setState({
      ...this.state,
      open: this.state.selected.specifics.length > 0,
    })
  }

  handleDialogClose = (choice) => {
    this.setState({
      open: false,
      selected: null,
      chosenSymbols: this.state.chosenSymbols.filter((item) => item.label !== choice.label).concat(choice)
    })
  }

  removeChosenSymbol = () => {}

  render () {
    return (
      <div className="dream-interpreter">
        <h1>Dream Interpreter</h1>
        <p>Select various symbols that you may have seen in your dream, and let our engine combile our dream symbol data and tell you what your dream symbols really mean.</p>
        <div className='symbol-text-field'>
          <Autocomplete
            disablePortal
            id="symbol"
            options={symbols}
            value={this.state.selected}
            sx={{ width: '100%', marginRight: '10px'}}
            renderInput={(params) => <TextField {...params} label="Dream Symbols" />}
            onChange={(event, value) => {
              this.setState({ ...this.state, selected: value})
            }}
          />
          <Button variant="contained" sx={{ width: 100 }} onClick={this.handleAddSymbol}>Add</Button>
        </div>
        {
          this.state.chosenSymbols.map((item) => (
            <Chip key={item.label} label={item.label} onDelete={(e, value) => console.log('delete', e.target.value, value)} />
          ))
        }
        <div>{JSON.stringify(this.state.selected)}</div>
        <div>{JSON.stringify(this.state.chosenSymbols)}</div>
        <SpecificsDialog 
          onClose={this.handleDialogClose}
          open={this.state.open}
          selected={this.state.selected}
        />
      </div>
    )
  }
}

export default App;
