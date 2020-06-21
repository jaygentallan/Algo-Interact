import React from "react";
import Header from "../components/Header/Header";
import ViewArticle from "../components/Hub/ViewArticle";
import Footer from "../components/Footer/Footer";
import { withRouter } from "react-router-dom";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const ViewArticlePage = (props) => {
	var id, user;

	if (props.location.state) {
		id = props.location.state.id;
		user = props.location.state.user;
	}

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="Container">
			{scrollToTop()}
			<Header {...props} />
			<ViewArticle {...props} id={id} user={user} />
			<Footer />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default withRouter(ViewArticlePage);
