import React from "react";
import Header from "../components/Header/Header";
import ViewDraft from "../components/Hub/ViewDraft";
import Footer from "../components/Footer/Footer";
import { withRouter } from "react-router-dom";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const ViewDraftPage = (props) => {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="Container">
			{scrollToTop()}
			<Header {...props} />
			<ViewDraft {...props} />
			<Footer footer="visualizer" />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default withRouter(ViewDraftPage);
