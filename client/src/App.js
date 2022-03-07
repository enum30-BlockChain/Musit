import "./App.css";
import { Route, Routes } from "react-router-dom";
import LegisterLayout from "./Components/Index";
import Legister from "./Components/register/index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<LegisterLayout />}></Route>
          <Route path="legister" element={<Legister />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
