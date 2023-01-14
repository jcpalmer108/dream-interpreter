import React, { useState } from 'react'
import { Autocomplete, TextField, Button } from '@mui/material';
import symbols from '../content/data';
import './App.css';

function App () {
  const [selected, setSelected] = useState([])
  const [displayInterpretation, setDisplayInterpretation] = useState(false)

  return (
    <div className="dream-interpreter">
      <h1>Dream Interpreter</h1>
      <p>Select various symbols that you may have seen in your dream, and let our engine combile our dream symbol data and tell you what your dream symbols really mean.</p>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={symbols}
        getOptionLabel={(item) => item.label}
        filterSelectedOptions
        value={selected}
        disabled={displayInterpretation}
        onChange={(event, value) => {setSelected(value)}}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Dream Symbols"
            placeholder="Choose your dream symbols..."
          />
        )}
      />
      <Button variant="contained" onClick={() => { setDisplayInterpretation(true)}}>Interpret Dream </Button>
      
    </div>
  )
}

export default App;
