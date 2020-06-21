import React from "react";
import Home from "../components/Home/Home";
import Header from "../components/Header/Header";
import Hub from "../components/Hub/Hub";
import Footer from "../components/Footer/Footer";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const HubPage = (props) => {
	return (
		<div className="Container">
			<Header {...props} />
			<Hub {...props} />
			<Footer />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default HubPage;
