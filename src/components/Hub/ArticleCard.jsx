import React from "react";
import "./ArticleCard.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

/*  This component represents the Cards to be used
    in the home page. The stretched-link makes it 
    so that anywhere on the card–when clicked–will lead 
    to specified page. 
*/
const ArticleCard = (props) => {
	return (
		<div className="discuss card border">
			<Link
				className="discuss link"
				to={{
					pathname: "/hub/viewarticle/" + props.data.id,
					state: { data: props.data },
				}}
			>
				<img class="discuss card-img-top" src={props.image} />
				<div className="card content">
					<h3 className="discuss title">{props.title}</h3>
					<p className="discuss subtitle"> {props.subtitle} </p>
					<p className="discuss author">
						By {props.author[0]} {props.author[1]}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default ArticleCard;
