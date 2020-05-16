import React from 'react'
import './App.css'

import Auth from 'components/Auth'
import { AppContainer } from 'components/AppContainer'
import { WSAPIContainer } from 'components/WSAPIContainer'
import { Router, Route, Switch } from 'components/Router'

import PlayerEdit from 'pages/PlayerEdit'
import Home from 'pages/Home'

function App() {
  return (
    <div className="App">
      <AppContainer>
        <WSAPIContainer>
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
        </WSAPIContainer>
      </AppContainer>
    </div>
  )
}

export default App
