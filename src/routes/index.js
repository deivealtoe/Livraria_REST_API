import express from 'express'
import livros from './livrosRoutes.js'

const routes = (app) => {
  app.route('/').get((request, response) => {
    response.status(200)
    response.send({ titulo: 'Curso de Node.JS' })
  })

  app.use(express.json(), livros)
}

export default routes