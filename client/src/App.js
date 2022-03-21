import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
//pages
import MainLayout from "./components/MainLayout.jsx";
// import Songs from "./components/songs/Songs.jsx";
import Register from "./components/register/Register.jsx";
import Listener from "./components/register/user/listener/Listener.jsx";
import Artist from "./components/register/user/artist/Artist.jsx";
import Metamask from "./web3/matamask.ts";
import MyPageLayout from "./components/myPage/MyPage.jsx";
import MyArtist from "./components/myPage/myRoom/artistroom/MyArtist";
import MyListener from "./components/myPage/myRoom/userRoom/MyListener";
import Fileupload from "./components/fileupload/FileUpload.jsx";

// import Navbar from "./components/navBar/Navbar.jsx";
// import ImgUpload from "./components/fileupload/ImgUpload.jsx";
import MusicSearch from "./components/musicSerach/MusicSearch.jsx";
import Footer from "./components/footer/footer.jsx";

function App() {
  const [adress, setAdress] = (useState = "");
  useEffect(() => {
    Metamask.enableEthereum();
  }, []);

  const showToastOnClick = () => {
    const toast = document.querySelector(".toast-container");
    const progress = document.querySelector(".progress");
    const closeIcon = document.querySelector(".close");

    toast.classList.add("active");
    progress.classList.add("active");
    console.log(progress);

    setTimeout(() => {
      toast.classList.remove("active");
    }, 5000);

    setTimeout(() => {
      progress.classList.remove("active");
    }, 5300);

    closeIcon.addEventListener("click", () => {
      toast.classList.remove("active");
    });
  };

  return (
    <>
      {/* <Toast />
      <Button onClick={showToastOnClick}>Show Toast</Button> */}

      {/* <Navbar /> */}
      <Routes>
        <Route path="/">
          <Route
            index
            element={<MainLayout adress={adress} setAddress={setAddress} />}
          ></Route>

          <Route path="Register" element={<Register />}></Route>
          <Route path="Listener" element={<Listener />}></Route>
          <Route path="Artist" element={<Artist />}></Route>
          <Route path="MyPageLayout" element={<MyPageLayout />}></Route>
          <Route path="MyArtist" element={<MyArtist />}></Route>
          <Route path="MyListener" element={<MyListener />}></Route>
          <Route path="fileupload" element={<Fileupload />}></Route>
          <Route path="MusicSearch" element={<MusicSearch />}></Route>
          <Route path="Footer" element={<Footer />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
