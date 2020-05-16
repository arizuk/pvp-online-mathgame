import React from 'react'
import { WSAPIClient } from 'api/client'

type Props = {
  client: WSAPIClient
}
export default function GameWindow({ client }: Props) {
  return <div>Server response waiting..</div>
}
