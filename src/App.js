import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Header from "./components/Header/Header";
import Routes from "./Router";

import "./App.css";

const App = () => {
  return (
    <div className="contentBody">
      <Provider store={store}>
        <Header />
        <Routes />
      </Provider>
    </div>
  );
};

export default App;
