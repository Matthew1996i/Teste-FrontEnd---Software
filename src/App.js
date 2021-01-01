import React from "react";

import Header from "./components/Header/Header";
import Routes from "./Router";

import "./App.css";

const App = () => {
  return (
    <div className="contentBody">
      <Header />
      <Routes />
    </div>
  );
};

export default App;
