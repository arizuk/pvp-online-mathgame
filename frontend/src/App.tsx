import React from 'react'
import './App.css'

import Auth from 'components/Auth'
import { AppContainer } from 'components/AppContainer'
import { Router, Route, Switch } from 'components/Router'

import PlayerEdit from 'pages/PlayerEdit'
import Home from 'pages/Home'

function App() {
  return (
    <div className="App">
      <AppContainer>
        <Router>
          <Switch>
            <Route page="playerEdit" component={PlayerEdit} />

            <Auth>
              <Switch>
                <Route page="home" component={Home} />
              </Switch>
            </Auth>
          </Switch>
        </Router>
      </AppContainer>
    </div>
  )
}

export default App
