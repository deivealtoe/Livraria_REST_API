import express from 'express'

const app = express()

const livros = [
  { id: 1, titulo: 'Senhor dos Anéis' },
  { id: 2, titulo: 'Clube da Luta'}
]

app.get('/', (request, response) => {
  response.status(200)
  response.send('Curso de Node.JS')
})

app.get('/livros', (request, response) => {
  response.status(200)
  response.json(livros)
})

export default app