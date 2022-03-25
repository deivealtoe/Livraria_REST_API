import app from './src/app.js'

const port = process.env.PORT || 3000
const host = '127.0.0.1'

app.listen(port, host, () => {
  console.log(`Servidor local rodando em http://${host}:${port}`)
})