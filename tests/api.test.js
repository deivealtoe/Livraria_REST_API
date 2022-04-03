import axios from 'axios'

const cadastrarAutorERetornarOsDados = async (autor) => {
  const resposta = await axios.post('http://127.0.0.1:3000/autores', autor)

  return resposta
}

const deletarAutorPorId = async (_id) => {
  const resposta = await axios.delete(`http://127.0.0.1:3000/autores/${_id}`)

  return resposta
}

const pegarTodosOsAutores = async () => {
  const resposta = await axios.get('http://127.0.0.1:3000/autores')

  return resposta
}

it('Deve retornar um array de autores', async () => {
  const resposta = await pegarTodosOsAutores()

  expect(Array.isArray(resposta.data)).toBe(true)
})

it('Deve cadastrar um novo autor corretamente e posteriormente deletá-lo', async () => {
  const autor = { nome: "Autor Jest 001", nacionalidade: "Nacionalidade 001 Jest" }
  const respostaDoCadastro = await cadastrarAutorERetornarOsDados(autor)

  expect(respostaDoCadastro.status).toBe(201)
  expect(respostaDoCadastro.data.nome).toBe(autor.nome)
  expect(respostaDoCadastro.data.nacionalidade).toBe(autor.nacionalidade)

  const respostaDoDelete = await deletarAutorPorId(respostaDoCadastro.data._id)

  expect(respostaDoDelete.status).toBe(200)
  expect(respostaDoDelete.data.message).toBe('Autor deletado')
})

it('Deve cadastrar um novo autor, alterar o nome e deletá-lo', async () => {
  const autor = { nome: "Autor Jest 002", nacionalidade: "Nacionalidade 002 Jest" }
  const respostaDoCadastro = await cadastrarAutorERetornarOsDados(autor)

  expect(respostaDoCadastro.status).toBe(201)
  expect(respostaDoCadastro.data.nome).toBe(autor.nome)
  expect(respostaDoCadastro.data.nacionalidade).toBe(autor.nacionalidade)

  const respostaDaAlteracao = await axios.put(`http://127.0.0.1:3000/autores/${respostaDoCadastro.data._id}`, { nome: "Novo Autor Jest" })

  expect(respostaDaAlteracao.status).toBe(200)
  expect(respostaDaAlteracao.data.message).toBe('Autor atualizado com sucesso')

  const respostaDoDelete = await deletarAutorPorId(respostaDoCadastro.data._id)

  expect(respostaDoDelete.status).toBe(200)
  expect(respostaDoDelete.data.message).toBe('Autor deletado')
})