# pvp-online-mathgame

足し算で対戦するアプリ


## Architecture

```mermaid
flowchart LR
    Client[BrowserClient] <-- Protobuf over WebSocket --> WebServer
    WebServer <-- Protobuf over Message Queue --> GameServer
```