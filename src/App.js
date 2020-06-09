import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

// Used for routing different pages
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// Pages
import HomePage from "./pages/home";
import VisualizerPage from "./pages/visualizer";
import LearnPage from "./pages/learn";
import HubPage from "./pages/hub";
import NewArticlePage from "./pages/newArticle";
import NotFoundPage from "./pages/404";
import ViewArticlePage from "./pages/viewArticle";

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
						render={(props) => <VisualizerPage {...props} isAuthenticated={this.props.isAuthenticated} username={this.props.username} />}
					/>
					<Route exact path="/learn" render={() => <LearnPage {...this.props} />} />
					<Route exact path="/hub" render={() => <HubPage {...this.props} />} />
					<Route
						exact
						path="/hub/viewarticle/:id"
						render={(props) => <ViewArticlePage {...props} isAuthenticated={this.props.isAuthenticated} username={this.props.username} />}
					/>
					<Route exact path="/hub/newArticle" render={() => <NewArticlePage {...this.props} />} />
					{/*
					<Route exact path="/" component={HomePage} {...this.props} />
					<Route exact path="/visualizer" component={VisualizerPage} {...this.props} />
					<Route exact path="/learn" component={LearnPage} {...this.props} />
					<Route exact path="/discuss" component={DiscussPage} {...this.props} />
					*/}
					{/*<Route path="/404" component={NotFoundPage} />
					<Redirect to="/404" />*/}
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.token != null,
		username: state.username,
		id: state.id,
		first_name: state.first_name,
		last_name: state.last_name,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
