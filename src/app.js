import express from 'express'
import db from './config/dbConnect.js'

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso')
})

const app = express()

app.use(express.json())

const livros = [
  { id: 1, titulo: 'Senhor dos Anéis' },
  { id: 2, titulo: 'Clube da Luta'}
]

app.get('/livros/:id', (request, response) => {
  const indiceLivro = buscaLivro(request.params.id)

  if (indiceLivro === -1) {
    response.status(404)
    response.send('Livro não encontrado')
  } else {
    response.status(200)
    response.json(buscaLivroObj(indiceLivro))
  }
})

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
  } else {
    response.status(400)
    response.json('Falha ao inserir novo livro. É necessário informar "id" e "titulo"')
  }
})

app.put('/livros/:id', (request, response) => {
  if (request.params.id && request.body.titulo) {
    const indiceLivro = buscaLivro(request.params.id)

    if (indiceLivro === -1) {
      response.status(400)
      response.send('Livro não encontrado')
    } else {
      livros[indiceLivro].titulo = request.body.titulo
      response.status(200)
      response.json(buscaLivroObj(indiceLivro))
    }
  } else {
    response.status(400)
    response.send('Falha ao alterar livro. Favor informar "id" na URI e o "titulo" no body.')
  }  
})

app.delete('/livros/:idLivro', (request, response) => {
  const { idLivro } = request.params

  const indiceLivro = buscaLivro(idLivro)

  if (indiceLivro === -1) {
    response.status(404)
    response.send(`Não foi possível encontrar o livro de ID ${idLivro}`)
  } else {
    livros.splice(indiceLivro, 1)
    response.status(200)
    response.send(`Livro de ID ${idLivro} foi removido com sucesso`)
  }
})

function buscaLivro(idLivro) {
  return livros.findIndex((livro) => {
    return idLivro == livro.id
  })
}

function buscaLivroObj(indiceLivro) {
  return livros[indiceLivro]
}

export default app