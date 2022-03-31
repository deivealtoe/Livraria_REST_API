import express from 'express'
import AutorController from '../controllers/autoresController.js'

const router = express.Router()

router
  .get('/autores', AutorController.listarAutores)
  .get('/autores/:id', AutorController.apresentarAutor)
  .post('/autores', AutorController.cadastrarAutor)
  .put('/autores/:id', AutorController.atualizarAutor)
  .delete('/autores/:idAutor', AutorController.deletarAutor)

export default router