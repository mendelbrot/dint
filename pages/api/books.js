import clientPromise from '/lib/mongodb'
import { v4 as uuid } from 'uuid'

const DATABASE = 'dint_2'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      await get_books(req, res)
    } else if (req.method === 'POST') {
      await post_book(req, res)
    } else {
      throw { error: `method ${req.method} not supported at this endpoint` }
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// get books (metadata)
async function get_books (req, res) {
  const book_id = req?.query?.book

  const client = await clientPromise
  const db = client.db(DATABASE)
  const docs = await db
    .collection(docs_name)
    .find({})
    .sort({ date: -1 })
    .toArray()

  res.status(200).json({books: docs})
}

// post book
async function post_book(req, res) {
  const body = req.body
  const new_book_id = uuid()
  const new_book = { ...body, _id: new_book_id }
  const client = await clientPromise
  const db = client.db(DATABASE)
  if (new_book?.type === 'daily_log') {
    await db
      .collection('books')
      .insertOne(new_book)
  } else {
    throw { error: 'book type not supported'}
  }
  res.status(200).json({ _id: new_book_id })
}
