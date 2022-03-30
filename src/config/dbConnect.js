import mongoose from 'mongoose'

mongoose.connect("mongodb://livraria_user:livraria_password@127.0.0.1:27017/livraria_alura", { autoIndex: false })
const db = mongoose.connection

export default db