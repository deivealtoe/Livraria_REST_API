db.createUser(
  {
    user: "livraria_user",
    pwd: "livraria_password",
    roles: [{ role: "readWrite", db: "livraria_alura" }]
  }
)
