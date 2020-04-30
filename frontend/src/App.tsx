import React from 'react'
import './App.css'

import { PageRoot } from 'pages'
import { AppContainer } from 'containers/App'

function App() {
  return (
    <div className="App">
      <AppContainer>
        <PageRoot></PageRoot>
      </AppContainer>
    </div>
  )
}

export default App
