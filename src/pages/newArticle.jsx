import React from "react";
import Header from "../components/Header/Header";
import NewArticle from "../components/Hub/NewArticle";
import Footer from "../components/Footer/Footer";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const NewArticlePage = (props) => {
	return (
		<div className="Container">
			<Header {...props} />
			<NewArticle {...props} />
			<Footer />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default NewArticlePage;
