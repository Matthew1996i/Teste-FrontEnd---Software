import React, { useEffect, useState, useCallback} from 'react'
import axios from 'axios'


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
    await axios.get('https://crudcrud.com/api/982c95577fd9444c942356eba7cbe1cc/stock')
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
    <div>
      <div className="listHeader">
        <ul>
          {
            Object.keys(stock[0]).map(item => {
              return <li key={item}>{item}</li>
            })
          }
        </ul>
      </div>
      <br/>
      <div className="listContent">
        <ul>
          {
            Object.values(stock).map(name => {
              return(
                <li key={name._id}>
                  <ul>
                    <li>{name._id}</li>
                    <li>{name.product}</li>
                    <li>{name.price}</li>
                    <li>{name.quantity}</li>
                    <li>{name.client}</li>
                    <li>{name.active}</li>
                    
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>

    </div>
  )
}

export default Main