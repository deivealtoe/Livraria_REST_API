db.createUser(
  {
    user: "livraria_user",
    pwd: "livraria_password",
    roles: [{ role: "readWrite", db: "livraria_alura" }]
  }
);

db.livros.insertOne({
  id: 1,
  titulo: "Senhor dos Anéis",
  autor: "Tolkien",
  editora: "Boa Pergunta",
  numeroDePaginas: 555
});