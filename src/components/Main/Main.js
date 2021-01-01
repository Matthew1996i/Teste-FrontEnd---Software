import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { history } from "../../history";

import { ENDPOINT_TOKEN } from "../../services/auth";

import "./Main.css";

const Main = () => {
  const [stock, setStock] = useState([]);

  const URL = `https://crudcrud.com/api/${ENDPOINT_TOKEN}/stock`;

  //this function, takes the data from the endpoint and presents it in the application
  const getStockData = useCallback(async (URL) => {
    await axios
      .get(URL)
      .then((resp) => {
        setStock(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //this function, redirects to the edit page with the data to edit
  const editForm = () => {
    history.push("/form");
  };

  //this function, removes data from a line at the endpoint
  const deleteProduct = async (id) => {
    const table = document.getElementById("tableStock");
    const lines = table.rows;

    const linesArray = Object.values(lines);

    const index = linesArray.findIndex((item) => item.id === id);

    if(linesArray.length === 2){
      table.deleteRow(index);
      table.deleteRow(0);

    }else{
      table.deleteRow(index);
    }

    await axios
      .delete(`${URL}/${id}`)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //effect of loading the data presented on screen
  useEffect(() => {
    getStockData(URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stock.length === 0) {
    return(
      <div className="tableList">
        <button id="create">Create a new product</button>
        <h4>Nenhum item cadastrado em stock</h4>
      </div>
    )
  }else{
    return (
      <div className="tableList">
        <button id="create">Create a new product</button>
        <table id="tableStock" className="responsive-table">
          <thead>
            <tr className="tableTitle">
              {Object.keys(stock[0]).map((item) => {
                return <th key={item}>{item}</th>;
              })}
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(stock).map((name) => {
              return (
                <tr id={name._id} className="tableValues" key={name._id}>
                  <td>{name._id}</td>
                  <td>{name.product}</td>
                  <td>{name.price}</td>
                  <td>{name.quantity}</td>
                  <td>{name.client}</td>
                  <td>{name.active ? "Yes" : "No"}</td>
                  <td>
                    <button id="select" onClick={editForm}>
                      Select
                    </button>
                  </td>
                  <td>
                    <button
                      id="delete"
                      onClick={(e) => {
                        deleteProduct(name._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Main;
