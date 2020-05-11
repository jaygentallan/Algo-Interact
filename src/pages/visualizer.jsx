import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AlgoTab from "../components/AlgoTab/AlgoTab";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const VisualizerPage = (props) => {
  var dataStructure;
  if (props.location.state) {
    dataStructure = props.location.state;
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {scrollToTop()}
      <Header />
      <AlgoTab dataStructure={dataStructure} />
      <Footer />
    </div>
  );
};

// Used to be able to import VisualizerPage
// outside of this file.
export default VisualizerPage;
