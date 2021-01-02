import React from "react";
import axios from "axios";

import { URL } from "../../services/auth";
import { history } from "../../history";

import "./FormCreate.css";

const FormCreate = () => {
  const createRegister = async (e) => {
    e.preventDefault();

    //get values from form inputs
    const { prod, amount, price, client, bool } = e.target;

    const data = {
      product: prod.value,
      quantity: amount.value,
      price: price.value,
      client: client.value,
      active: bool.value,
    };

    await axios({
      method: "post",
      url: URL,
      data,
    })
      .then((resp) => {
        alert("Criado com sucesso!");
        history.push("/");
      })
      .catch((err) => {
        alert("Houve um erro ao criar o produto!");
      });
  };

  return (
    <div className="formContent">
      <h2>Cadastre o pedido para o stock</h2>
      <form className="formControl" onSubmit={createRegister}>
        <label htmlFor="prod">Produto</label>
        <input id="prod" type="text" placeholder="Iphone" autoFocus required />

        <label htmlFor="amount">Quantidade</label>
        <input
          id="amount"
          min="1"
          max="1000000"
          type="number"
          placeholder="1"
          required
        />

        <label htmlFor="price">Preço</label>
        <input
          id="price"
          type="number"
          min="0.01"
          max="10000.00"
          step="0.01"
          placeholder="0,00"
          required
        />

        <label htmlFor="client">Cliente</label>
        <input id="client" type="text" placeholder="Maria Joana" required />
        <div>
          <label htmlFor="true">Ativo</label>
          <br></br>
          <input
            type="radio"
            id="true"
            value="true"
            name="bool"
            defaultChecked
          />
          <label htmlFor="false">Inativo</label>
          <br></br>
          <input type="radio" id="false" value="false" name="bool" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FormCreate;
