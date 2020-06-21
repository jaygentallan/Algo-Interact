import React from "react";
import Learn from "../components/Learn/Learn";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const LearnPage = (props) => {
	return (
		<div className="Container">
			<Header {...props} />
			<Learn />
			<Footer />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default LearnPage;
