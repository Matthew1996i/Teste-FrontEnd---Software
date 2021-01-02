import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { URL } from "../../services/auth";
import { history } from "../../history";

import "../FormEdit/FormEdit.css";

const FormEdit = () => {
  const _id = useSelector((state) => state.id);

  const [stock, setStock] = useState([
    {
      product: "",
      quantity: 0,
      price: 0,
      client: "",
      active: true,
    },
  ]);

  const updateRegister = async (e) => {
    e.preventDefault();

    const data = {
      product: stock.product,
      quantity: stock.quantity,
      price: stock.price,
      client: stock.client,
      active: stock.active,
    };

    await axios({
      method: "PUT",
      url: `${URL}/${_id}`,
      data,
    })
      .then((resp) => {
        alert("Editado com sucesso!");
        history.push("/");
      })
      .catch((err) => {
        alert("Houve um erro ao Editar o produto!");
      });
  };

  const loadData = useCallback(async (URL) => {
    await axios
      .get(URL)
      .then((resp) => {
        setStock(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadData(`${URL}/${_id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValue = (event) => {
    const { id, value } = event.target;

    if (id === "prod") {
      return setStock({
        ...stock,
        product: value,
      });
    } else if (id === "amount") {
      return setStock({
        ...stock,
        quantity: value,
      });
    } else if (id === "client") {
      return setStock({
        ...stock,
        client: value,
      });
    } else if (id === "price") {
      return setStock({
        ...stock,
        price: value,
      });
    } else {
      return setStock({
        ...stock,
        active: value,
      });
    }
  };

  return (
    <div className="formContent">
      <h2>Edite o item do stock</h2>
      <form className="formControl" onSubmit={updateRegister}>
        <label htmlFor="prod">Produto</label>
        <input
          onChange={getValue}
          value={stock.product}
          id="prod"
          type="text"
          placeholder="Iphone"
          autoFocus
          required
        />

        <label htmlFor="amount">Quantidade</label>
        <input
          onChange={getValue}
          value={stock.quantity}
          id="amount"
          min="1"
          max="1000000"
          type="number"
          placeholder="1"
          required
        />

        <label htmlFor="price">Preço</label>
        <input
          onChange={getValue}
          value={stock.price}
          id="price"
          type="number"
          min="0.01"
          max="10000.00"
          step="0.01"
          placeholder="0,00"
          required
        />

        <label htmlFor="client">Cliente</label>
        <input
          onChange={getValue}
          value={stock.client}
          id="client"
          type="text"
          placeholder="Maria Joana"
          required
        />
        <div>
          <label htmlFor="true">Ativo</label>
          <br></br>
          <input
            onChange={getValue}
            type="radio"
            id="true"
            value="true"
            name="bool"
            defaultChecked
          />
          <label htmlFor="false">Inativo</label>
          <br></br>
          <input
            onChange={getValue}
            type="radio"
            id="false"
            value="false"
            name="bool"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FormEdit;
