import autores from '../models/Autor.js'

class AutorController {
  static listarAutores = (request, response) => {
    autores.find((err, autores) => {
      if (err) {
        response.status(500)
        response.json({ message: `${err.message} - Falha ao buscar listagem de autores` })
      } else {
        response.status(200)
        response.json(autores)
      }
    })
  }

  static apresentarAutor = (request, response) => {
    const id = request.params.id

    autores.findById(id, (err, autor) => {
      if (err) {
        response.status(400)
        response.send({ message: `${err.message} - Falha ao buscar pelo autor indicado` })
      } else if (autor === null) {
        response.status(404)
        response.send({ message: 'Autor não encontrado' })
      } else {
        response.status(200)
        response.send(autor)
      }
    })
  }

  static cadastrarAutor = (request, response) => {
    let novoAutor = new autores(request.body)

    novoAutor.save((err) => {
      if (err) {
        response.status(500)
        response.send({ message: `${err.message} - Falha ao cadastrar autor` })
      } else {
        response.status(201)
        response.send(novoAutor.toJSON())
      }
    })
  }

  static atualizarAutor = (request, response) => {
    const id = request.params.id

    autores.findByIdAndUpdate(id, { $set: request.body }, (err) => {
      if (err) {
        response.status(500)
        response.send({ message: `${err.message} - Falha ao atualizar o autor especificado` })
      } else {
        response.status(200)
        response.send({ message: 'Autor atualizado com sucesso' })
      }
    })
  }

  static deletarAutor = (request, response) => {
    const { idAutor } = request.params

    autores.findByIdAndDelete(idAutor, (err) => {
      if (err) {
        response.status(500)
        response.send(`${err.message} - Falha ao deletar autor informado`)
      } else {
        response.status(200)
        response.send({ message: 'Autor deletado' })
      }
    })
  }
}

export default AutorController