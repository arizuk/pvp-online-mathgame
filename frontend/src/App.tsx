import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Props {}
interface State {}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }

  componentDidMount() {
    const devPort = "3000"
    const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    let { host, port } = window.location

    if (port === devPort) {
      host = host.replace(devPort, "8000")
    }
    const wsUrl = `${protocolPrefix}//${host}/ws`
    const ws = new WebSocket(wsUrl)
    ws.addEventListener("message", ev => {
      console.log(ev.data)
    })
    ws.addEventListener("open", ev => {
      console.log("WS onOpen")
      ws.send(JSON.stringify({
          "type": "JOIN",
          "payload": {}
      }))
    })
  }
}