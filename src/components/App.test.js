import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('../content/data.js', () => [
  {
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
  },
  {
    label: 'Redirect',
    redirect: 'Test'
  },
  {
    label: 'Test',
    meaning: 'test base meaning'
  },
])

// always dialog result
function clickSpecificsEntry (input, autocomplete) {
  fireEvent.change(input, { target: { value: 'a' } })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
}

// possible dialog result - depends on redirected symbol
function clickRedirectEntry (input, autocomplete) {
  fireEvent.change(input, { target: { value: 'a' } })
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

  // test('if no chips are selected, interpret my dreams buttons hould be disabled', () => {
  //   render(<App />);
  //   const interpretButton = screen.getByRole("button", { name: 'Interpret my dream'});
  //   expect(interpretButton).toHaveAttribute('disabled')
  
  //   const autocomplete = screen.getByTestId('autocomplete');
  //   const input = within(autocomplete).getByRole('combobox')
  //   autocomplete.focus()
  //   fireEvent.change(input, { target: { value: 'a' } })
  //   fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  //   fireEvent.keyDown(autocomplete, { key: 'Enter' })
  //   fireEvent.click(screen.getByRole("button", { name: 'Add'}))
  
  //   expect(interpretButton).not.toHaveAttribute('disabled')
  // });
  
test('when item is added, and it has specifics, open a dialog', async () => {
  render(<App />);
  const addButton = screen.getByRole("button", { name: 'Add'});
  const autocomplete = screen.getByTestId('autocomplete')
  autocomplete.focus()
  clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(addButton)
  expect(screen.getAllByRole("radio")).toHaveLength(3)
})

test('when item with specifics is added, and the dialog is opened, when any radio button is clicked add a chip', async () => {
  render(<App />);
  expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

  const addButton = screen.getByRole("button", { name: 'Add'});
  const autocomplete = screen.getByTestId('autocomplete')
  autocomplete.focus()
  clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(addButton)
  fireEvent.click(screen.getAllByRole('radio')[0])

  expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
})

test('when item with no specifics is added, a chip is added', async () => {
  render(<App />);
  expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

  const addButton = screen.getByRole("button", { name: 'Add'});
  const autocomplete = screen.getByTestId('autocomplete')
  autocomplete.focus()
  clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(addButton)

  expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
})

test('when multiple symbols are added, they are all kept as chips', async () => {
  render(<App />);
  expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

  const addButton = screen.getByRole("button", { name: 'Add'});
  const autocomplete = screen.getByTestId('autocomplete')
  autocomplete.focus()
  clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(addButton)
  clickSpecificsEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(addButton)
  fireEvent.click(screen.getAllByRole('radio')[0])

  expect(screen.getByTestId('chips').childNodes).toHaveLength(2)
})

// test the outside of the dialog is clicked that the dialog closes and a chip is added

test('when a chip is added, and the delete x on the chip is clicked, the symbol is removed', async () => {
  render(<App />);
  expect(screen.getByTestId('chips').childNodes).toHaveLength(0)

  const addButton = screen.getByRole("button", { name: 'Add'});
  const autocomplete = screen.getByTestId('autocomplete')
  const input = within(autocomplete).getByRole('combobox')
  autocomplete.focus()
  fireEvent.change(input, { target: { value: 'a' } })
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
  fireEvent.click(addButton)
  fireEvent.click(screen.getAllByRole('radio')[0])

  expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
  fireEvent.click(screen.getByTestId('chips').childNodes[0].childNodes[1])
  expect(screen.getByTestId('chips').childNodes).toHaveLength(0)
})


test('the same symbol cannot be added twice', async () => {
  render(<App />);
  expect(screen.getByTestId('chips').childNodes).toHaveLength(0)
  const addButton = screen.getByRole("button", { name: 'Add'});
  const autocomplete = screen.getByTestId('autocomplete')

  autocomplete.focus()
  clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(addButton)
  clickBaseEntry(within(autocomplete).getByRole('combobox'), autocomplete)
  fireEvent.click(addButton)

  expect(screen.getByTestId('chips').childNodes).toHaveLength(1)
})


