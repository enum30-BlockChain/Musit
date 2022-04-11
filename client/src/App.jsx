import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import Back from "./components/landingpage/back/Back";
import React from "react";

const App = () => {
  return (
    <>
      <Back />
      <Navbar />
    </>
  );
};

export default App;
