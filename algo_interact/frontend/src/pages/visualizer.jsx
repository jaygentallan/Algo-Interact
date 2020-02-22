import React from "react";
import Main from "../components/Main/Main";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import Node from '../components/Node/Node.jsx'

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const VisualizerPage = () => {
  return (
    <div className="Container">
      <Header />
      <Footer />
      
    </div>
  );
};

// Used to be able to import VisualizerPage
// outside of this file.
export default VisualizerPage;
