import axios from 'axios'

const buscarEditoraPorId = async (_id) => {
  const resposta = await axios.get(`http://127.0.0.1:3000/editora/${_id}`, { validateStatus: () => true })

  return resposta
}

it('Deve retornar status 404 ao buscar editora com ID inexistente', async () => {
  const _id = '624853eecab2afdac4d78361'
  
  const respostaGet = await buscarEditoraPorId(_id)

  expect(respostaGet.status).toBe(404)
})
