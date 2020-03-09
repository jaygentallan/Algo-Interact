import React from "react";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";


// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const HomePage = () => {
  return (
    <div className="Container">
      <Header />
      <Home />
    </div>
  );
};

// Used to be able to import HomePage
// outside of this file.
export default HomePage;
