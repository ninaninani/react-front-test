import React from "react";
import {useRoutes} from 'hookrouter';
import Routes from './router'
import "./styles/index.scss";
import Login from "./pages/login";


function App() {
  return useRoutes(Routes);
}

export default App;
