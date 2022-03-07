import "./App.css";
import { Route, Routes } from "react-router-dom";
import LegisterLayout from "./Components/Index";
import Legister from "./Components/register/index";
import Lisener from "./Components/register/user/Lisener";
import Artist from "./Components/register/user/Artist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<LegisterLayout />}></Route>
          <Route path="legister" element={<Legister />}></Route>
          <Route path="Lisener" element={<Lisener />}></Route>
          <Route path="Artist" element={<Artist />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
