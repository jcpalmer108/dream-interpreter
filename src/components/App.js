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
    if((this.state.selected && this.state.selected.specifics) || (this.state.selected.redirect && this.state.selected.redirect.specifics)) {
      this.setState({
        ...this.state,
        open: true,
      })
    } else {
      this.setState({
        ...this.state,
        chosenSymbols: this.addChosenSymbol({
          label: this.state.selected.label || null,
          redirect: null,
          base: this.state.selected.meaning,
        }),
        selected: null
      })
    }
}
  addChosenSymbol = (choice) => this.state.chosenSymbols.filter((chosenSymbol) => chosenSymbol.label !== choice.label).concat(choice)

  openDialog = () => {
    this.setState({
      ...this.state,
      open: true,
    })
  }

  closeDialog = (choice) => {
    this.setState({
      open: false,
      selected: null,
      chosenSymbols: this.addChosenSymbol(choice)
    })
  }

  removeChosenSymbol = (labelToRemove) => {
    this.setState({
      ...this.state,
      chosenSymbols: this.state.chosenSymbols.filter((item) => item.label !== labelToRemove)
    })
  }

  generateChips = () => {
    console.log('this', this.state.chosenSymbols)
    return this.state.chosenSymbols.map((item, index) => (
      <Chip key={`chip ${index + 1}`} label={item.label} onDelete={() => this.removeChosenSymbol(item.label)} />
    ))
  }

  render () {
    return (
      <div className="dream-interpreter">
        <h1>Dream Interpreter</h1>
        <p>Select various symbols that you may have seen in your dream, and let our engine combile our dream symbol data and tell you what your dream symbols really mean.</p>
        <div className='symbol-text-field'>
          <Autocomplete
            data-testid="autocomplete"
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
          <Button variant="contained" sx={{ width: 100 }} onClick={this.handleAddSymbol} disabled={this.state.selected === null}>Add</Button>
        </div>
        <div className="chip-wrapper" data-testid="chips">
          {this.generateChips()}
        </div>
        <div>{JSON.stringify(this.state.selected)}</div>
        <div>{JSON.stringify(this.state.chosenSymbols)}</div>
        <SpecificsDialog 
          data-testid="specific-dialog"
          onClose={this.closeDialog}
          open={this.state.open}
          selected={this.state.selected}
          redirect={this.state.selected && this.state.selected.redirect && symbols.filter((item) => item.label === this.state.selected.redirect)[0]}
        />
        <Button variant="text" onClick={() => console.log('interpret')} disabled={this.state.chosenSymbols.length === 0}>Interpret my dream</Button>
      </div>
    )
  }
}

export default App;
