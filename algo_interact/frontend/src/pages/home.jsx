import React from "react";
import Main from "../components/Main/Main";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const HomePage = () => {
  return (
    <div className="Container">
      <Header />
      <Home />
      {/*
      <Main />
      <div className="Side1">
        <Sidebar />
      </div>
      <div className="Side2">
        <Sidebar />
      </div>
      <Footer />
      */}
    </div>
  );
};

// Used to be able to import HomePage
// outside of this file.
export default HomePage;
