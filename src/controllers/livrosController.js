import livros from '../models/Livro.js'

class LivroController {
  static listarLivros = (request, response) => {
    livros.find((err, livros) => {
      response.status(200)
      response.json(livros)
    })
  }

  static apresentarLivro = (request, response) => {
    const id = request.params.id

    livros.findById(id, (err, livros) => {
      if (err) {
        response.status(400)
        response.send({ message: `${err.message} - Falha ao buscar pelo livro indicado` })
      } else {
        response.status(200)
        response.send(livros)
      }
    })
  }

  static cadastrarLivro = (request, response) => {
    let novoLivro = new livros(request.body)
  
    novoLivro.save((err) => {
      if (err) {
        response.status(500)
        response.send({ message: `${err.message} - Falha ao cadastrar livro` })
      } else {
        response.status(201)
        response.send(novoLivro.toJSON())
      }
    })
  }

  static atualizarLivro = (request, response) => {
    const id = request.params.id

    livros.findByIdAndUpdate(id, { $set: request.body }, (err) => {
      if (err) {
        response.status(500)
        response.send({ message: `${err.message} - Falha ao atualizar o livro especificado` })
      } else {
        response.status(200)
        response.send({ message: 'Livro atualizado com sucesso' })
      }
    })
  }

  static deletarLivro = (request, response) => {
    const { idLivro } = request.params

    livros.findByIdAndDelete(idLivro, (err) => {
      if (err) {
        response.status(500)
        response.send(`${err.message} - Falha ao deletar livro informado`)
      } else {
        response.status(200)
        response.send({ message: 'Livro deletado' })
      }
    })
  }
}

export default LivroController