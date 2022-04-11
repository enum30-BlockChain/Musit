import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import Back from "./components/landingpage/back/Back";
import React from "react";
import Main from "./components/main/Main";

const App = () => {
  return (
    <>
      <Back />
      <Main />
      <Navbar />
    </>
  );
};

export default App;
