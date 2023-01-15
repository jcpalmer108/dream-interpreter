import React, { Component } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import symbols from '../content/data';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chosenSymbols: [],
      selected: {},
    };
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
            sx={{ width: '100%', marginRight: '10px'}}
            renderInput={(params) => <TextField {...params} label="Dream Symbols" />}
            onChange={(event, value) => {
              console.log(event, value)
              this.setState({ ...this.state, selected: value})
            }}
          />
          <Button variant="contained" sx={{ width: 100 }}>Add</Button>
        </div>
        <div>{JSON.stringify(this.state.selected)}</div>
      </div>
    )
  
  }
}

export default App;
