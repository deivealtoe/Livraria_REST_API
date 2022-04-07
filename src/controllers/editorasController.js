import editoras from '../models/Editora.js'

class EditoraController {
  static listarEditoras = (request, response) => {
    editoras.find((err, editoras) => {
      if (err) {
        response.status(500)
        response.send({ message: `${err.message} - Falha ao buscar listagem de editoras` })
      } else {
        response.status(200)
        response.json(editoras)
      }
    })
  }

  static apresentarEditora = (request, response) => {
    const id = request.params.id

    editoras.findById(id, (err, editora) => {
      if (err) {
        response.status(400)
        response.send({ message: `${err.message} - Falha ao buscar editora indicada` })
      } else if (editora === null) {
        response.status(404)
        response.send({ message: 'Editora não encontrada' })
      } else {
        response.status(200)
        response.send(editora)
      }
    })
  }

  static cadastrarEditora = (request, response) => {
    let novaEditora = new editoras(request.body)

    novaEditora.save((err) => {
      if (err) {
        response.status(500)
        response.send({ message: `${err.message} - Falha ao cadastrar editora` })
      } else {
        response.status(201)
        response.send(novaEditora.toJSON())
      }
    })
  }

  static atualizarEditora = (request, response) => {
    const id = request.params.id

    editoras.findByIdAndUpdate(id, { $set: request.body }, (err) => {
      if (err) {
        response.status(500)
        response.send({ message: `${err.message} - Falha ao atualizar editora especificada` })
      } else {
        response.status(200)
        response.send({ message: 'Editora atualizada com sucesso' })
      }
    })
  }

  static deletarEditora = (request, response) => {
    const { idEditora } = request.params

    editoras.findByIdAndDelete(idEditora, (err) => {
      if (err) {
        response.status(500)
        response.send(`${err.message} - Falha ao deletar editora especificada`)
      } else {
        response.status(200)
        response.send({ message: 'Editora deletada' })
      }
    })
  }
}

export default EditoraController