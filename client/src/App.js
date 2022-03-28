import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
//pages
import MainLayout from "./components/MainLayout.jsx";
import Songs from "./components/songs/Songs.jsx";
import Register from "./components/register/Register.jsx";
import Listener from "./components/register/user/listener/Listener.jsx";
import Artist from "./components/register/user/artist/Artist";
import Metamask from "./web3/Metamask";
import Ethers from "./web3/Ethers";
import MyPageLayout from "./components/myPage/MyPage.jsx";
import MyArtist from "./components/myPage/artistroom/MyArtist";
import MyListener from "./components/myPage/userRoom/MyListener";
import Fileupload from "./components/fileupload/FileUpload.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
// import ImgUpload from "./components/fileupload/ImgUpload.jsx";
import MusicSearch from "./components/musicSerach/MusicSearch.jsx";
import Footer from "./components/footer/Footer.jsx";
import UserSubscription from "./components/myPage/userRoom/page/UserSubscription";
import UserList from "./components/myPage/userRoom/page/UserList";
import MyPlayList from "./components/myPage/userRoom/page/MyPlayList";
import YshTest from "./components/ysh/YshTest";
import TotalPlayList from "./components/myPage/userRoom/page/TotalPlayList";
import RecentlyPlayed from "./components/myPage/userRoom/page/RecentlyPlayed";
import Auction from "./components/auction/Auction";
import Store from "./components/store/Store";
import CreateNFT from "./components/createNFT/CreateNFT.jsx";

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
      <Navbar address={address} setAddress={setAddress} />
      <Routes>
        <Route path="/">
          <Route
            index
            element={<MainLayout address={address} setAddress={setAddress} />}
          ></Route>
          <Route
            path="Register"
            element={<Register address={address} />}
          ></Route>
          <Route
            path="Listener"
            element={<Listener address={address} />}
          ></Route>
          <Route path="Artist" element={<Artist address={address} />}></Route>
          <Route path="Songs" element={<Songs />}></Route>
          <Route path="MyPageLayout" element={<MyPageLayout />}></Route>
          <Route
            path="MyArtist"
            element={<MyArtist address={address} />}
          ></Route>{" "}
          <Route path="Auction" element={<Auction />}></Route>{" "}
          <Route path="Store" element={<Store />}></Route>
          <Route path="MyListener" element={<MyListener address={address} />}>
            <Route
              path="UserSubscription"
              element={<UserSubscription />}
            ></Route>
            <Route path="UserList" element={<UserList />}></Route>
            <Route path="myplaylist" element={<MyPlayList />}></Route>
            <Route path="totalplaylist" element={<TotalPlayList />}></Route>
            <Route path="recentlyplayed" element={<RecentlyPlayed />}></Route>
          </Route>
          <Route path="fileupload" element={<Fileupload address={address} />} />
          <Route
            path="MusicSearch"
            element={<MusicSearch address={address} />}
          />
          <Route path="createnft" element={<CreateNFT address={address} />} />
          <Route path="Footer" element={<Footer />}></Route>
          <Route path="/ysh" element={<YshTest />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
