export const getWsServerUrl = () => {
  const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  let { host, port } = window.location

  // XXX: portが3000の場合はwebpack devserver経由だと判断する
  const devPort = '3000'
  if (port === devPort) {
    host = host.replace(devPort, '8000')
  }
  return `${protocolPrefix}//${host}/ws`
}
