import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Dispatch, SetStateAction } from "react";
import "./App.css";
import { Header } from "./Component/Header/header";
// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext({
  isAuth: false,
  setIsAuth: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  return (
    <>
      <authContext.Provider value={{ isAuth: isAuth, setIsAuth: setIsAuth }}>
        <Header />
        <Outlet />
      </authContext.Provider>
    </>
  );
}

export default App;
