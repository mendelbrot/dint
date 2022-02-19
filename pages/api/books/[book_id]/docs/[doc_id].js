import clientPromise from '/lib/api/mongodb'
import apiHandler from '/lib/api/apiHandler'
import { ObjectId } from 'mongodb'

const DATABASE = 'dint_2'

export default apiHandler({
  delete: delete_doc
})

async function delete_doc(req, res) {
  const book_id = req.query.book_id
  const doc = req.body

  // const now = Date.now()
  // doc.edited = now

  // const client = await clientPromise
  // const db = client.db(DATABASE)

  // console.log(doc)

  // // console.log(`docs.${book_id}`)

  // const _id = doc._id
  // console.log(_id)
  // delete doc._id
  // const update_res = await db
  //   .collection(`docs.${book_id}`)
  //   // .find({})
  //   // .sort({ edited: -1 })
  //   // .toArray()
  //   .updateOne({ _id: ObjectId(_id) }, { $set: doc })

  // let matched = update_res.matchedCount > 0
  // if (!matched) {
  //   throw `doc ${book_id} in book ${} not found`
  // }

  // console.log(update_res)

  res.status(200).json()
}