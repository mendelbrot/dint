import clientPromise from '/lib/mongodb'

const DATABASE = 'dint_2'

export default async function handler(req, res) {
  try {
    const book_id = req.query.book

    const client = await clientPromise
    const db = client.db(DATABASE)
    const book = await db
      .collection('books')
      .findOne({ _id: book_id })

    let response = {}
    if (book.book_type = 'daily_log') {
      const lenses_name = `lenses.${book_id}`
      const docs_name = `docs.${book_id}`
      const lenses = book.lenses
      delete book.lenses

      const docs = await db
        .collection(docs_name)
        .find({})
        .sort({ date: -1 })
        .toArray()

      response = {
        metadata: book,
        [lenses_name]: lenses,
        [docs_name]: docs
      }

      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error)
  }
  

  
}
