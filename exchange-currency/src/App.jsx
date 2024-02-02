import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./component/Home";
import Header from "./component/Header";
import Footer from "./component/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
     
        <Route path="" element={<Home />} />
       
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
