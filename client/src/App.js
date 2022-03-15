import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/Index";
import Legister from "./Components/register/index";
import Lisener from "./Components/register/user/Lisener/Lisener";
import Artist from "./Components/register/user/Artist/Artist";
import Metamask from "./Web3/Metamask";
import MyPageLayout from "./Components/MyPage/Index";
import MyArtist from "./Components/MyPage/MyRoom/MyArtist";
import MyLisener from "./Components/MyPage/MyRoom/MyLisener";
import Fileupload from "./Components/fileupload";

function App() {
  useEffect(() => {
    Metamask.enableEthereum();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<MainLayout />}></Route>
          <Route path="legister" element={<Legister />}></Route>
          <Route path="Lisener" element={<Lisener />}></Route>
          <Route path="Artist" element={<Artist />}></Route>
          <Route path="MyPageLayout" element={<MyPageLayout />}></Route>
          <Route path="MyArtist" element={<MyArtist />}></Route>
          <Route path="MyLisener" element={<MyLisener />}></Route>
          <Route path="fileupload" element={<Fileupload />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
