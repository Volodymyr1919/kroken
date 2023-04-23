import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Auth/SignUp/SignUp";
import SignIn from "./Auth/SignIn/SignIn";
import Home from "./Home/Home";
import Owner from "./Users/Owner/Owner";
import Visitor from "./Users/Visitor/Visitor";
import Income from "./Users/Visitor/Bonuses/Income";
import Outcome from "./Users/Visitor/Bonuses/Outcome";
import MainLayout from "./layouts/MainLayout";
import NFLayout from "./layouts/NFLayouts";
import Notfound from "./notFound/Notfound";
import PrivateLayout from "./layouts/PrivateLayout";
// eslint-disable-next-line no-unused-vars
import appStyle from "./scss/app.scss";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/owner" element={<Owner />} />
          <Route path="/user" element={<Visitor />} />
        </Route>
        <Route element={<NFLayout />}>
          <Route path="*" element={<Notfound />}/>
          <Route path="/income" element={<Income />} />
          <Route path="/outcome" element={<Outcome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;