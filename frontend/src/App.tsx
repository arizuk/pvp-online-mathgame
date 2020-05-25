import React from 'react'
import './App.css'

import Auth from 'components/Auth'
import { AppContainer } from 'components/AppContainer'
import { WSAPIContainer } from 'components/WSAPIContainer'
import { GameContainer } from 'components/GameContainer'
import { Router, Route, Switch } from 'components/Router'

import PlayerEdit from 'pages/PlayerEdit'
import Home from 'pages/Home'
import GameResult from 'pages/GameResult'

function App() {
  return (
    <div className="App">
      <AppContainer>
        <WSAPIContainer>
          <Router>
            <Switch>
              <Route page="playerEdit" component={PlayerEdit} />

              <Auth>
                <GameContainer>
                  <Switch>
                    <Route page="home" component={Home} />
                    <Route page="gameResult" component={GameResult} />
                  </Switch>
                </GameContainer>
              </Auth>
            </Switch>
          </Router>
        </WSAPIContainer>
      </AppContainer>
    </div>
  )
}

export default App
