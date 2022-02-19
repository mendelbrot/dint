import clientPromise from '/lib/api/mongodb'
import apiHandler from '/lib/api/apiHandler'
import { v4 as uuid } from 'uuid'

const DATABASE = 'dint_2'

export default apiHandler({
  post: import_book
})

async function import_book(req, res) {
  const body = req.body
  const book = body.metadata

  const new_book = { 
    ...book, 
    _id: uuid(), 
    created: book?.created || Date.now(),
    edited: Date.now()
  }

  const client = await clientPromise
  const db = client.db(DATABASE)

  if (new_book.type === 'daily_log') {
    const docs_new_key = `docs.${new_book._id}`
    const lenses_input_key = Object.keys(body).filter((prop) => { return prop.indexOf('lenses') == 0 })[0]
    const docs_input_key = Object.keys(body).filter((prop) => { return prop.indexOf('docs') == 0 })[0]
    new_book.lenses = body[lenses_input_key]

    await db
      .collection('books')
      .insertOne(new_book)
    await db
      .collection(docs_new_key)
      .insertMany(body[docs_input_key])
  } else {
    throw 'book type not supported'
  }

  res.status(200).json({ _id: new_book._id})
}

