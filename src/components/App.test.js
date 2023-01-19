import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import App from './App';

const specificEntry = {
  label: 'Specifics',
  meaning: 'test specific meaning',
  specifics: [
    {
      label: 'scenario 1', 
      value: "this is scenario one's meaning"
    },
    {
      label: 'scenario 2',
      value: "this is scenario two's meaning"
    }
  ]
}

const redirectToBaseEntry = {
  label: 'RedirectToBase',
  redirect: 'Base'
}

const redirectToSpecificsEntry = {
  label: 'RedirectToSpecifics',
  redirect: 'Specifics'
}

const baseEntry = {
  label: 'Base',
  meaning: 'test base meaning'
}

jest.mock('../content/data.js', () => [
  specificEntry,
  redirectToBaseEntry,
  redirectToSpecificsEntry,
  baseEntry
])

// always dialog result
function clickSpecificsEntry (input, autocomplete) {
  fireEvent.change(input, { target: { value: 'a' } })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
}

// possible dialog result - depends on redirected symbol
function clickRedirectToBaseEntry (input, autocomplete) {
  fireEvent.change(input, { target: { value: 'a' } })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
}

function clickRedirectToSpecificsEntry (input, autocomplete) {
  fireEvent.change(input, { target: { value: 'a' } })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
}

// no dialog result
function clickBaseEntry (input, autocomplete) {
  fireEvent.change(input, { target: { value: 'a' } })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
}


test('app components should be rendered on-page', () => {
  render(<App />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: 'Add'})).toBeInTheDocument();
  expect(screen.getByRole("button", { name: 'Interpret my dream'})).toBeInTheDocument();
});

test('add button should be disabled if there is no item selected', () => {
  render(<App />);
  const addButton = screen.getByRole("button", { name: 'Add'});
  expect(addButton).toHaveAttribute('disabled')

  const autocomplete = screen.getByTestId('autocomplete');
  const input = within(autocomplete).getByRole('combobox')
  autocomplete.focus()
  fireEvent.change(input, { target: { value: 's' } })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })

  expect(addButton).not.toHaveAttribute('disabled')
});

test('if no chips are selected, interpret my dreams buttons should be disabled', () => {
  render(<App />);
  const interpretButton = screen.getByRole("button", { name: 'Interpret my dream'});
  expect(interpretButton).toHaveAttribute('disabled')

  const autocomplete = screen.getByTestId('autocomplete');
  autocomplete.focus()
  clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(screen.getByRole("button", { name: 'Add'}))

  expect(interpretButton).not.toHaveAttribute('disabled')
});

describe('when item with specifics is added', () => {
  const renderSpecificsAdded = () => {
    render(<App />);
    const autocomplete = screen.getByTestId('autocomplete')
    autocomplete.focus()
    clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
    fireEvent.click(screen.getByRole("button", { name: 'Add'}))
  }

  test('a dialog opens', () => {
    renderSpecificsAdded();
    expect(screen.getByTestId("dialog")).toBeInTheDocument()
  })

  test('the specifics label to be listed on the dialog', () => {
    renderSpecificsAdded();
    expect(screen.getByText(specificEntry.label.toLowerCase())).toBeInTheDocument()
  })

  test('the specific items to be each listed in a radio button', () => {
    renderSpecificsAdded();
    expect(screen.getAllByRole("radio")).toHaveLength(specificEntry.specifics.length + 1)
  })

  test('when a radio button is clicked, the choice is added and displayed on page as a chip', () => {
    renderSpecificsAdded();
    fireEvent.click(screen.getAllByRole("radio")[0])
    expect(screen.getByTestId("chips").childNodes).toHaveLength(1)
  })

  test.only('no duplicate entries added for the same symbol', async () => {
    render(<App />);
    const autocomplete = screen.getByTestId('autocomplete')
    const input = within(autocomplete).getByRole('combobox')
    
    autocomplete.focus()
    clickSpecificsEntry(input, autocomplete)
    fireEvent.click(screen.getByRole("button", { name: 'Add'}))
    fireEvent.click(screen.getAllByRole("radio")[0])
    await waitFor(() => {
      expect(screen.queryByText("More information")).not.toBeInTheDocument()
    })

    autocomplete.focus()
    clickSpecificsEntry(input, autocomplete)
    fireEvent.click(screen.getByRole("button", { name: 'Add'}))
    await fireEvent.click(screen.getAllByRole("radio")[1])

    expect(screen.getByTestId("chips").childNodes).toHaveLength(1)
  })

})

describe('when item with a redirect to a specifics entry is added', () => {
  const renderRedirectToSpecificsAdded = () => {
    render(<App />);
    const autocomplete = screen.getByTestId('autocomplete')
    autocomplete.focus()
    clickRedirectToSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
    fireEvent.click(screen.getByRole("button", { name: 'Add'}))
  }

  test('a dialog opens', () => {
    renderRedirectToSpecificsAdded();
    expect(screen.getByTestId("dialog")).toBeInTheDocument()
  })

  test('the selected label and redirected label are listed on the dialog', () => {
    renderRedirectToSpecificsAdded();
    expect(screen.getByText(redirectToSpecificsEntry.label.toLowerCase())).toBeInTheDocument()
    expect(screen.getAllByText(specificEntry.label.toLowerCase())).toHaveLength(2)
  })

  test('the redirected items to be each listed in a radio button', () => {
    renderRedirectToSpecificsAdded();
    expect(screen.getAllByRole("radio")).toHaveLength(specificEntry.specifics.length + 1)
  })

  test('when a radio button is clicked, the choice is added and displayed on page as a chip', () => {
    renderRedirectToSpecificsAdded();
    fireEvent.click(screen.getAllByRole("radio")[0])
    expect(screen.getByTestId("chips").childNodes).toHaveLength(1)
  })

})

describe('when a redirect to a base entry is added', () => {
  const renderRedirectToBaseAdded = () => {
    render(<App />);
    const autocomplete = screen.getByTestId('autocomplete')
    autocomplete.focus()
    clickRedirectToBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
    fireEvent.click(screen.getByRole("button", { name: 'Add'}))
  }

})

describe('when a base entry is added', () => {
  const renderBaseAdded = () => {
    render(<App />);
    const autocomplete = screen.getByTestId('autocomplete')
    autocomplete.focus()
    clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
    fireEvent.click(screen.getByRole("button", { name: 'Add'}))
  }

})

// test('when item with specifics is added, a dialog opens', () => {
//   render(<App />);
//   const addButton = ;
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
// })

// test('when item with specifics is added and the dialog is open, expect there to be the label listed in the description', () => {
//   render(<App />);
//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   expect(screen.getByText("Specifics".toLowerCase())).toBeInTheDocument()
// })

// test('when item with a redirect is added and the dialog is open, expect there to be a custom message explaining the redirect', () => {
//   render(<App />);
//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickRedirectToBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   expect(screen.getByText("Redirect".toLowerCase())).toBeInTheDocument()
//   expect(screen.getAllByText("test".toLowerCase())).toHaveLength(2)
// })

// test('when item with specifics is added and the dialog is open, expect there to be radio buttons associated with each specific scenario', () => {
//   render(<App />);
//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   expect(screen.getAllByRole("radio")).toHaveLength(3) // two for each scenario above, one for none
// })

  
// test('when item is added, and it has specifics, open a dialog', async () => {
//   render(<App />);
//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   expect(screen.getAllByRole("radio")).toHaveLength(3)
// })

// test('when item with specifics is added, and the dialog is opened, when any radio button is clicked add a chip', async () => {
//   render(<App />);
//   expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   fireEvent.click(screen.getAllByRole('radio')[0])

//   expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
// })

// test('when item with no specifics is added, a chip is added', async () => {
//   render(<App />);
//   expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)

//   expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
// })

// test('when multiple symbols are added, they are all kept as chips', async () => {
//   render(<App />);
//   expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   autocomplete.focus()
//   clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   fireEvent.click(screen.getAllByRole('radio')[0])

//   expect(screen.getByTestId('chips').childNodes).toHaveLength(2)
// })

// // test the outside of the dialog is clicked that the dialog closes and a chip is added

// test('when a chip is added, and the delete x on the chip is clicked, the symbol is removed', async () => {
//   render(<App />);
//   expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')
//   const input = within(autocomplete).getByRole('combobox')
//   autocomplete.focus()
//   fireEvent.change(input, { target: { value: 'a' } })
//   fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
//   fireEvent.keyDown(autocomplete, { key: 'Enter' })
//   fireEvent.click(addButton)
//   fireEvent.click(screen.getAllByRole('radio')[0])

//   expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
//   fireEvent.click(screen.getByTestId('chips').childNodes[0].childNodes[1])
//   expect(screen.getByTestId('chips').childNodes).toHaveLength(0)
// })


// test('the same symbol cannot be added twice', async () => {
//   render(<App />);
//   expect(screen.getByTestId('chips').childNodes).toHaveLength(0)
//   const addButton = screen.getByRole("button", { name: 'Add'});
//   const autocomplete = screen.getByTestId('autocomplete')

//   autocomplete.focus()
//   clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)
//   clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
//   fireEvent.click(addButton)

//   expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
// })

// // test('if a symbol with a redirect is added, and the redirected symbol is also added, replace the original symbol', async () => {
// //   render(<App />);
// //   expect(screen.getByTestId('chips').childNodes).toHaveLength(0)
// //   const addButton = screen.getByRole("button", { name: 'Add'});
// //   const autocomplete = screen.getByTestId('autocomplete')

// //   autocomplete.focus()
// //   clickRedirectEntry(within(autocomplete).getByRole('combobox'), autocomplete)
// //   fireEvent.click(addButton)
// //   clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
// //   fireEvent.click(addButton)

// //   expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
// // })



