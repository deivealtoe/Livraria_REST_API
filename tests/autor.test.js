import axios from 'axios'

const cadastrarAutorERetornarOsDados = async (autor) => {
  const resposta = await axios.post('http://127.0.0.1:3000/autores', autor)

  return resposta
}

const deletarAutorPorId = async (_id) => {
  const resposta = await axios.delete(`http://127.0.0.1:3000/autores/${_id}`)

  return resposta
}

const alterarAutorPorId = async (_id, autor) => {
  const resposta = await axios.put(`http://127.0.0.1:3000/autores/${_id}`, autor)

  return resposta
}

const pegarTodosOsAutores = async () => {
  const resposta = await axios.get('http://127.0.0.1:3000/autores')

  return resposta
}

const buscarAutorPorId = async (_id) => {
  const resposta = await axios.get(`http://127.0.0.1:3000/autores/${_id}`)

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
  const novoAutor = { 
    nome: "Autor Jest 002",
    nacionalidade: "Nacionalidade 002 Jest"
  }

  const respostaDoCadastro = await cadastrarAutorERetornarOsDados(novoAutor)

  expect(respostaDoCadastro.status).toBe(201)
  expect(respostaDoCadastro.data.nome).toBe(novoAutor.nome)
  expect(respostaDoCadastro.data.nacionalidade).toBe(novoAutor.nacionalidade)

  const autorAlterado = {
    nome: "Novo Autor Jest"
  }
  
  const respostaDaAlteracao = await alterarAutorPorId(respostaDoCadastro.data._id, autorAlterado)

  expect(respostaDaAlteracao.status).toBe(200)
  expect(respostaDaAlteracao.data.message).toBe('Autor atualizado com sucesso')

  const respostaDoDelete = await deletarAutorPorId(respostaDoCadastro.data._id)

  expect(respostaDoDelete.status).toBe(200)
  expect(respostaDoDelete.data.message).toBe('Autor deletado')
})

it('Deve cadastrar um novo autor, alterar nacionalidade e ser deletado', async () => {
  const novoAutor = {
    nome: "Novo Autor 003",
    nacionalidade: "Nacionalidade XPTO"
  }

  const respostaDoCadastro = await cadastrarAutorERetornarOsDados(novoAutor)

  expect(respostaDoCadastro.status).toBe(201)
  expect(respostaDoCadastro.data.nome).toBe(novoAutor.nome)
  expect(respostaDoCadastro.data.nacionalidade).toBe(novoAutor.nacionalidade)

  const autorAlterado = {
    nacionalidade: "Nova Nacionalidade"
  }

  const respostaDaAlteracao = await alterarAutorPorId(respostaDoCadastro.data._id, autorAlterado)

  expect(respostaDaAlteracao.status).toBe(200)
  expect(respostaDaAlteracao.data.message).toBe('Autor atualizado com sucesso')

  const respostaDoDelete = await deletarAutorPorId(respostaDoCadastro.data._id)

  expect(respostaDoDelete.status).toBe(200)
  expect(respostaDoDelete.data.message).toBe('Autor deletado')
})

it('Deve cadastrar autor corretamente, buscar por ID e retornar status 200 juntamente com as informações', async () => {
  const novoAutor = {
    nome: "Novo nome",
    nacionalidade: "Nacionalidade ABCD"
  }

  const respostaCadastro = await cadastrarAutorERetornarOsDados(novoAutor)

  expect(respostaCadastro.status).toBe(201)
  expect(respostaCadastro.data.nome).toBe(novoAutor.nome)
  expect(respostaCadastro.data.nacionalidade).toBe(novoAutor.nacionalidade)

  const respostaBuscaAutorPorId = await buscarAutorPorId(respostaCadastro.data._id)

  expect(respostaBuscaAutorPorId.status).toBe(200)
  expect(respostaBuscaAutorPorId.data.nome).toBe(novoAutor.nome)
  expect(respostaBuscaAutorPorId.data.nacionalidade).toBe(novoAutor.nacionalidade)

  const respostaDelecao = await deletarAutorPorId(respostaCadastro.data._id)

  expect(respostaDelecao.status).toBe(200)
  expect(respostaDelecao.data.message).toBe('Autor deletado')
})
