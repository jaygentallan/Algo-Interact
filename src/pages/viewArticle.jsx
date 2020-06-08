import React from "react";
import Header from "../components/Header/Header";
import ViewArticle from "../components/Discuss/ViewArticle";
import Footer from "../components/Footer/Footer";
import { withRouter } from "react-router-dom";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const ViewArticlePage = (props) => {
	console.log("DATA:", props);
	var data;
	if (props.location.state) {
		data = props.location.state;
	}
	return (
		<div className="Container">
			<Header {...props} />
			<ViewArticle {...props} data={data} />
			<Footer />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default withRouter(ViewArticlePage);
