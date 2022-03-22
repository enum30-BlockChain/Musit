import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
//pages
import MainLayout from "./components/MainLayout.jsx";
// import Songs from "./components/songs/Songs.jsx";
import Register from "./components/register/Register.jsx";
import Listener from "./components/register/user/listener/Listener.jsx";
import Artist from "./components/register/user/artist/Artist.jsx";
import Metamask from "./web3/Metamask";
import MyPageLayout from "./components/myPage/MyPage.jsx";
import MyArtist from "./components/myPage/artistroom/MyArtist";
import MyListener from "./components/myPage/userRoom/MyListener";
import Fileupload from "./components/fileupload/FileUpload.jsx";
<<<<<<< HEAD
// import Toast from "./components/toast/Toast.jsx";
// import Button from "./components/styledComponents/Button.styled.jsx";
=======

import Navbar from "./components/navBar/Navbar.jsx";
// import ImgUpload from "./components/fileupload/ImgUpload.jsx";
import MusicSearch from "./components/musicSerach/MusicSearch.jsx";
import Footer from "./components/footer/Footer.jsx";
>>>>>>> main

function App() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      await Metamask.getAccounts(setAddress);
      await Metamask.walletListener(setAddress);
    };
    init();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route
            index
            element={<MainLayout address={address} setAddress={setAddress} />}
          ></Route>
          <Route path="Register" element={<Register />}></Route>
          <Route
            path="Listener"
            element={<Listener address={address} />}
          ></Route>
          <Route path="Artist" element={<Artist address={address} />}></Route>
          <Route path="MyPageLayout" element={<MyPageLayout />}></Route>
          <Route path="MyArtist" element={<MyArtist />}></Route>
<<<<<<< HEAD
          <Route path="MyListener" element={<MyListener />}></Route>
          <Route path="fileupload" element={<Fileupload />}></Route>
=======
          <Route
            path="MyListener"
            element={<MyListener address={address} />}
          ></Route>
          <Route
            path="fileupload"
            element={<Fileupload address={address} />}
          ></Route>
          <Route
            path="MusicSearch"
            element={<MusicSearch address={address} />}
          ></Route>
          <Route path="Footer" element={<Footer />}></Route>
>>>>>>> main
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
