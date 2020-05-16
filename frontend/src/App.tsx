import React from 'react'
import './App.css'

import Auth from 'components/Auth'
import { Router, Route, Switch } from 'components/Router'

import { Pages } from './consts'
import { AppContainer } from 'containers/App'

import PlayerEdit from 'pages/PlayerEdit'
import Home from 'pages/Home'

function App() {
  return (
    <div className="App">
      <AppContainer>
        <Router>
          <Switch>
            <Route page={Pages.PlayerEdit} component={PlayerEdit} />

            <Auth>
              <Switch>
                <Route page={Pages.Home} component={Home} />
              </Switch>
            </Auth>
          </Switch>
        </Router>
      </AppContainer>
    </div>
  )
}

export default App
