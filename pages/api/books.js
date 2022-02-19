import clientPromise from '/lib/api/mongodb'
import apiHandler from '/lib/api/apiHandler'
import { v4 as uuid } from 'uuid'

const DATABASE = 'dint_2'

export default apiHandler({
  get: get_books_metadata,
  post: create_new_book
})

async function get_books_metadata (req, res) {
  const client = await clientPromise
  const db = client.db(DATABASE)
  const docs = await db
    .collection('books')
    .find({})
    .sort({ edited: -1 })
    .toArray()

  res.status(200).json({books: docs})
}

async function create_new_book(req, res) {
  const book = req.body

  const new_book = { 
    ...book, 
    _id: uuid(), 
    created: Date.now(),
    edited: Date.now()
  }

  const client = await clientPromise
  const db = client.db(DATABASE)
  await db
    .collection('books')
    .insertOne(new_book)

  res.status(200).json({ _id: new_book._id })
}
