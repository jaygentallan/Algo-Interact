import React from "react";
import Learn from "../components/Learn/Learn";
import Header from "../components/Header/Header";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const LearnPage = () => {
  return (
    <div className="Container">
      <Header />
      <Learn />
    </div>
  );
};

// Used to be able to import HomePage
// outside of this file.
export default LearnPage;


