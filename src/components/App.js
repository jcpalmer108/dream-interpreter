import React, { Component } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import symbols from '../content/data';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chosenSymbols: [],
      selected: null,
    };
  }

  handleAddSymbol = () => {
    this.setState({
      chosenSymbols: this.state.chosenSymbols.concat([this.state.selected]),
      selected: null
    })
  }

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
        <div>{JSON.stringify(this.state.selected)}</div>
        <div>{JSON.stringify(this.state.chosenSymbols)}</div>
      </div>
    )
  
  }
}

export default App;
