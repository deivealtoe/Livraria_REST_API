import axios from 'axios'

const buscarEditoraPorId = async (_id) => {
  const resposta = await axios.get(`http://127.0.0.1:3000/editoras/${_id}`, { validateStatus: () => true })

  return resposta
}

const cadastrarEditora = async (novaEditora) => {
  const resposta = await axios.post('http://127.0.0.1:3000/editoras', novaEditora)

  return resposta
}

const deletarEditora = async (_id) => {
    const resposta = await axios.delete(`http://127.0.0.1:3000/editoras/${_id}`)

    return resposta
}

it('Deve retornar status 404 ao buscar editora com ID inexistente', async () => {
  const _id = '624853eecab2afdac4d78361'
  
  const respostaGet = await buscarEditoraPorId(_id)

  expect(respostaGet.status).toBe(404)
})

it('Deve cadastrar uma editora e deletá-la', async () => {
  const novaEditora = {
    nome: "Nova Editora Jest"
  }

  const respostaCadastro = await cadastrarEditora(novaEditora)

  expect(respostaCadastro.status).toBe(201)
  expect(respostaCadastro.data.nome).toBe(novaEditora.nome)

  const respostaDelete = await deletarEditora(respostaCadastro.data._id)

  expect(respostaDelete.status).toBe(200)
})