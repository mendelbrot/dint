import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: green;
`

export default function Home() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const getData = (uri) => {
    setData(null)
    setError(null)
    setLoading(true)

    fetch(uri)
      .then(async (res) => {
        console.log(res)
        const status = res.status
        const contentType = res.headers.get('content-type')
        const isJson = contentType?.includes('application/json')
        const dat = isJson ? await res.json() : null

        if (status !== 200) {
          const errs = [`status: ${res.status}`]
          const message = dat?.message
          if (message) {
            errs.push(message)
          }
          setError(errs)
        } else if (!isJson) {
          setError([`response content-type header ${contentType} not application/json`])
        } else {
          setData(dat)
        }

        setLoading(false)

      }).catch((err) => {
        console.log(err)
        setError(['an unknown error occurred'])
        setLoading(false)
      })
    }

  useEffect(() => {
    getData('api/books')
  }, [])

  if (loading) { 
    return (
    <div>Loading...</div>
    )
  }
  
  if (error) {
    return (
      <ul>
        {error.map((err) => 
          <li key={err}>{err}</li>
        )}
      </ul>
    )
  }

  if (data) {
    console.log(data)
    return (
      <ul>
        {data.books.map((item) =>
          <li key={item._id}>{item.name}</li>
        )}
      </ul>
    )
  }
}