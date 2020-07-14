import React from "react";
import LearnMore from "../../components/Learn/LearnMore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const LearnMorePage = (props) => {
	var name = props.name;

	/*
	if (props.location.state) {
		name = props.location.state.name;
	}
	*/

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="Container">
			{scrollToTop()}
			<Header {...props} />
			<LearnMore {...props} />
			<Footer />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default LearnMorePage;
