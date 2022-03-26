import express from 'express'

const app = express()

app.use(express.json())

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

app.post('/livros', (request, response) => {
  let novoLivro = request.body
  
  if (novoLivro.id && novoLivro.titulo) {
    livros.push(novoLivro)

    response.status(201)
    response.send('Livro cadastrado com sucesso')
  }

  response.status(400)
  response.json('Falha ao inserir novo livro. É necessário informar "id" e "titulo"')
})

export default app