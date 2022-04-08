import "./App.css";
import { Navbar } from "./component/navbar/Navbar";
import { Main } from "./component/main/Main";
import "react";
import { useEffect } from "react";
import { readMetamaskData } from "./redux/actions/metamaskAction";
import { readUserData } from "./redux/actions/userActions";

function App() {
  useEffect(() => {
    const init = async () => {
      await dispatch(readMetamaskData());
      await dispatch(readUserData());
    };
    init();
  }, []);

  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export default App;
