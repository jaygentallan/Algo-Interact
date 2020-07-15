import React from "react";
import Header from "../../../components/Header/Header";
import NewArticle from "../../../components/Hub/NewArticle";
import Footer from "../../../components/Footer/Footer";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const NewArticlePage = (props) => {
	var id, title, subtitle, content, cover, isDraft, isEdit;

	if (props.draftData && props.draftData.location.state) {
		title = props.draftData.location.state.title;
		subtitle = props.draftData.location.state.subtitle;
		content = props.draftData.location.state.content;
		cover = props.draftData.location.state.cover;
		isDraft = props.draftData.location.state.isDraft;
	}

	if (props.editData && props.editData.location.state) {
		id = props.editData.location.state.id;
		title = props.editData.location.state.title;
		subtitle = props.editData.location.state.subtitle;
		content = props.editData.location.state.content;
		cover = props.editData.location.state.cover;
		isEdit = props.editData.location.state.isEdit;
	}

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="Container">
			{scrollToTop()}
			<Header {...props} />
			<NewArticle {...props} title={title} subtitle={subtitle} content={content} cover={cover} />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default NewArticlePage;
