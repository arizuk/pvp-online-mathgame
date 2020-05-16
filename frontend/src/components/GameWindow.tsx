import React from 'react'
import { useEffect } from 'react'
import { WSAPIClient } from 'api/client'

type Props = {
  client: WSAPIClient
}
export default function GameWindow({ client }: Props) {
  useEffect(() => {
    client.socket.addEventListener('message', (ev) => {
      alert(ev.data)
    })
    client.startGame()
  }, [client])

  return <div>Server response waiting..</div>
}
