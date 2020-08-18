import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

// Used for routing different pages
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";

import VisualizerPage from "./pages/VisualizerPage";

import LearnPage from "./pages/Learn/LearnPage";
import LearnMorePage from "./pages/Learn/LearnMorePage";

import HubPage from "./pages/Hub/HubPage";
import NewArticlePage from "./pages/Hub/Article/NewArticlePage";
import ViewArticlePage from "./pages/Hub/Article/ViewArticlePage";
import EditProfilePage from "./pages/Profile/EditProfilePage";

import ViewProfilePage from "./pages/Profile/ViewProfilePage";
import ViewDraftPage from "./pages/Hub/Article/ViewDraftPage";

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
					<Route
						exact
						path="/learn/arrays-and-strings"
						render={(props) => <LearnMorePage {...this.props} title_id={"arrays-and-strings-introduction"} />}
					/>
					<Route
						exact
						path="/learn/stacks-and-queues"
						render={(props) => <LearnMorePage {...this.props} title_id={"stacks-and-queues-introduction"} />}
					/>
					<Route
						exact
						path="/learn/hash-tables"
						render={(props) => <LearnMorePage {...this.props} title_id={"hash-tables-introduction"} />}
					/>
					<Route
						exact
						path="/learn/linked-lists"
						render={(props) => <LearnMorePage {...this.props} title_id={"linked-lists-introduction"} />}
					/>
					<Route exact path="/learn/trees" render={(props) => <LearnMorePage {...this.props} title_id={"trees-introduction"} />} />
					<Route exact path="/learn/graphs" render={(props) => <LearnMorePage {...this.props} title_id={"graphs-introduction"} />} />
					<Route
						exact
						path="/learn/graph-algorithms"
						render={(props) => <LearnMorePage {...this.props} title_id={"graph-algorithms-introduction"} />}
					/>
					<Route
						exact
						path="/learn/tree-traversals"
						render={(props) => <LearnMorePage {...this.props} title_id={"tree-traversals-introduction"} />}
					/>

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
		articleStatus: state.articles.articleStatus,
		drafts: state.articles.drafts,
		topics: state.learn.topics,
		currTopic: state.learn.currTopic,
		learnError: state.learn.error,
		loading: state.auth.loading != null ? state.auth.loading : true,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
