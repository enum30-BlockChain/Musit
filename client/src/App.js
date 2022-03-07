import "./App.css";
import { Route, Routes } from "react-router-dom";
import LegisterLayout from "./Components/Index";
import Legister from "./Components/register/index";
import Lisener from "./Components/register/user/Lisener";
import Artist from "./Components/register/user/Artist";
import MyPageLayout from "./Components/MyPage/Index";
import MyArtist from "./Components/MyPage/MyRoom/MyArtist";
import MyLisener from "./Components/MyPage/MyRoom/MyLisener";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .get("/api/test")
      .then((res) => console.log(res))
      .catch();
  });

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<LegisterLayout />}></Route>
          <Route path="legister" element={<Legister />}></Route>
          <Route path="Lisener" element={<Lisener />}></Route>
          <Route path="Artist" element={<Artist />}></Route>
          <Route path="MyPageLayout" element={<MyPageLayout />}></Route>
          <Route path="MyArtist" element={<MyArtist />}></Route>
          <Route path="MyLisener" element={<MyLisener />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
