import React from "react";
import Header from "../../components/Header/Header";
import EditProfile from "../../components/Profile/EditProfile";
import Footer from "../../components/Footer/Footer";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const EditProfilePage = (props) => {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<div className="Container">
			{scrollToTop()}
			<Header {...props} />
			<EditProfile {...props} />
			<Footer footer="visualizer" />
		</div>
	);
};

// Used to be able to import HomePage
// outside of this file.
export default EditProfilePage;
