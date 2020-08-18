import React from "react";
import Header from "../../components/Header/Header";
import ViewProfile from "../../components/Profile/ViewProfile";
import Footer from "../../components/Footer/Footer";
import { withRouter } from "react-router-dom";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const ViewProfilePage = (props) => {
	var username;

	if (props.location) {
		username = props.match.params.username;
	}

	console.log("PROPS:", props);
	console.log("USERNAME:", username);

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="Container">
			{scrollToTop()}
			<Header {...props} />
			<ViewProfile {...props} username={username} />
			<Footer footer="visualizer" />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default withRouter(ViewProfilePage);
