import { useState, useEffect } from 'react'
import styled from 'styled-components'
import withData from '/components/withData'

const Title = styled.h1`
  font-size: 50px;
  color: green;
`

function Home(props) {
  const {loading, error, data, getData } = props

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
      <div>
        <button onClick={getData}>Refresh</button>
        <ul>
          {data.map((item) =>
            <li key={item._id}>{item.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default withData(Home, 'api/books')