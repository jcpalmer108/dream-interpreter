const symbols = [
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
    label: 'RedirectToBase',
    redirect: 'Base'
  },
  {
    label: 'RedirectToSpecifics',
    redirect: 'Specifics'
  },
  {
    label: 'Base',
    meaning: 'test base meaning'
  },
]

export default symbols