import React from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import { navigate } from 'hookrouter';

const routes = {
    "/": () => < Home / > ,
    "/login": () => < Login / > ,
    "/logout": () => {
        localStorage.removeItem("isLoggedIn")
        navigate("/login")
        return <Login/>
    }
};
export default routes;