import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

// Used for routing different pages
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import VisualizerPage from "./pages/VisualizerPage";
import LearnPage from "./pages/LearnPage";
import HubPage from "./pages/HubPage";
import NewArticlePage from "./pages/NewArticlePage";
import ViewArticlePage from "./pages/ViewArticlePage";
import EditProfilePage from "./pages/EditProfilePage";
import ViewProfilePage from "./pages/ViewProfilePage";
import ViewDraftPage from "./pages/ViewDraftPage";

// Main App class to be rendered by the React DOM
// in the index.js file.
class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		return (
			// Uses Router class to be able to switch
			// around different paths with its corresponding components.
			<Router>
				<Switch>
					<Route exact path="/" render={() => <HomePage {...this.props} />} />
					<Route
						exact
						path="/visualizer"
						render={(props) => (
							<VisualizerPage {...props} isAuthenticated={this.props.isAuthenticated} currUserProfile={this.props.currUserProfile} />
						)}
					/>
					<Route exact path="/learn" render={() => <LearnPage {...this.props} />} />
					<Route exact path="/hub" render={() => <HubPage {...this.props} />} />
					<Route exact path="/hub/viewarticle/:id" render={() => <ViewArticlePage {...this.props} />} />
					<Route exact path="/hub/newarticle" render={(props) => <NewArticlePage {...this.props} draftData={props} />} />
					<Route exact path="/hub/editarticle" render={(props) => <NewArticlePage {...this.props} editData={props} />} />
					<Route exact path="/hub/drafts" render={() => <ViewDraftPage {...this.props} />} />
					<Route exact path="/editprofile" render={() => <EditProfilePage {...this.props} />} />
					<Route exact path="/viewprofile/:username" render={() => <ViewProfilePage {...this.props} />} />
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token != null,
		currUserProfile: state.profile.currUserProfile === null ? null : state.profile.currUserProfile,
		userProfile: state.profile.userProfile === null ? null : state.profile.userProfile,
		articles: state.articles.articles,
		currArticle: state.articles.currArticle,
		drafts: state.articles.drafts,
		loading: state.auth.loading != null ? state.auth.loading : true,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
