import React, { Component } from "react";
import "./DraftCard.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

/*  This component represents the Cards to be used
    in the home page. The stretched-link makes it 
    so that anywhere on the card–when clicked–will lead 
    to specified page. 
*/
class DraftCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cover: "",
			coverFile: null,
			created_at: null,
		};
	}

	componentDidMount() {
		this.convertURLToObjectURL(this.props.cover);
		const created_at = this.props.created_at.split("T")[0];
		const year = created_at.split("-")[0];
		const month = created_at.split("-")[1] - 1;
		const day = created_at.split("-")[2].replace(/^0+/, "");
		const date = new Date(year, month, day);
		const formatted_date = date.toLocaleString("en-us", { month: "long" }) + " " + day + " " + year;

		this.setState({
			created_at: formatted_date,
		});
	}

	// Fetches the S3 Image URL and converts it into a File Object, to be sent to the REST Framework
	convertURLToObjectURL = async (url) => {
		const response = await fetch(url);
		const blob = await response.blob();
		const file = new File([blob], "image.jpg", { type: blob.type });
		this.setState({
			cover: URL.createObjectURL(file),
			coverFile: file,
		});
	};

	render() {
		return (
			<div className="draft card border">
				<Link
					className="discuss link"
					to={{
						pathname: "/hub/newarticle",
						state: {
							id: this.props.id,
							title: this.props.title,
							subtitle: this.props.subtitle,
							content: this.props.content,
							cover: this.state.coverFile,
							isDraft: this.props.isDraft,
						},
					}}
				>
					{this.state.cover ? <img class="draft card-img-top" src={this.state.cover} /> : <div />}
					<div className="draft card content">
						<h3 className="draft title">{this.props.title}</h3>
						<p className="draft subtitle"> {this.props.subtitle} </p>
						<p className="draft created_at">Created at {this.state.created_at}</p>
					</div>
				</Link>
			</div>
		);
	}
}

export default DraftCard;
