import "./App.css";
import { Main } from "./components/main/Main.jsx";
import { Navbar } from "./components/navbar/Navbar";

import React from "react";

const App = () => {
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
};

export default App;
