import React, { useEffect, useState, useCallback} from 'react'
import axios from 'axios'

import './Main.css'

const Main = () => {
  
  const [ stock, setStock ] = useState([
    {
    "_id" : "",
    "product": "",
    "quantity" : 0,
    "price" : 0,
    "client" : "",
    "active" : false
  }

])

  const handdleData = useCallback( async() => {
    const token = 'a70548404a644ad8a480654d579177be'

    const URL = `https://crudcrud.com/api/${token}/stock`

    await axios.get(URL)
      .then(resp => {
        setStock(resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[])
  
  useEffect(() => {
    handdleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return(
    
    <div className="tableList">
      <table className="responsive-table">
        <thead>
          <tr className="tableTitle">
          {
            Object.keys(stock[0]).map(item => {
              return <th key={item}>{item}</th>
            })
          }
          <th> </th>
          <th> </th>
          </tr>
        </thead>
        <tbody>
          {
            Object.values(stock).map(name => {
              return(
                  <tr className="tableValues" key={name._id}>
                    <td>{name._id}</td>
                    <td>{name.product}</td>
                    <td>{name.price}</td>
                    <td>{name.quantity}</td>
                    <td>{name.client}</td>
                    <td>{name.active ? "Yes" : "No"}</td>
                    <td><button id="select">Select</button></td>
                    <td><button id="delete">Delete</button></td>
                  </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Main