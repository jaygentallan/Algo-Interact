import React, { Component } from "react";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import "./Discuss.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

import axios from "axios";

/*
  This is the default page that opens when users navigate to
  our website. There are Card components within the Learn Page, 
  and when clicked, the Data Structures route to the Visualizer 
  page and opens up the corresponding data structure tab. When 
  an algorithm Card is clicked, the user is routed to the Learn
  Page. 
*/

class Discuss extends Component {
	constructor(props) {
		super(props);

		this.state = {
			discuss: [],
			profile: [],
		};
	}

	componentDidMount() {
		this.getDiscuss();
		this.getProfile();
	}

	getDiscuss() {
		axios
			.get("http://127.0.0.1:8080/posts/")
			.then((res) => {
				this.setState({ discuss: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getProfile() {
		axios
			.get("http://127.0.0.1:8080/users/")
			.then((res) => {
				this.setState({ profile: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				{this.state.discuss.map((item) => (
					<div key={item.id}>
						<h1> {item.title} </h1>
						<h3> {item.author} </h3>
						<h5> {item.created_at} </h5>
						<p> {item.body} </p>
					</div>
				))}
				{this.state.profile.map((item) => (
					<div>
						<h1> {item.username} </h1>
						<h1> {item.image} </h1>
					</div>
				))}
			</div>
		);
	}
}

export default Discuss;
