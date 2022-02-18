import clientPromise from '/lib/mongodb'
import { v4 as uuid } from 'uuid'

const DATABASE = 'dint_2'

export default async function handler(req, res) {
  try {
    const body = req.body
    const new_book_id = uuid()
    const new_book = { ...body.metadata, _id: new_book_id }
    const client = await clientPromise
    const db = client.db(DATABASE)

    if (new_book.type === 'daily_log') {
      const docs_new_key = `docs.${new_book_id}`
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
      throw { error: 'book type not supported' }
    }
  } catch (error) {
    res.status(500).json(error)
  }

  res.status(200).json({ _id: new_book_id})
}

