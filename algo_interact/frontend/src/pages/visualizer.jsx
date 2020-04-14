import React from "react";
import Header from "../components/Header/Header";
import GraphVisualizer from "../Algocomponents/Graph/GraphVisualizer";
import Footer from "../components/Footer/Footer";
import AlgoTab from "../components/AlgoTab/AlgoTab"

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const VisualizerPage = () => {
  
  return (
    <div>
      <Header />
      <AlgoTab /> 
      <Footer />
    </div>
  );
};

// Used to be able to import VisualizerPage
// outside of this file.
export default VisualizerPage;
