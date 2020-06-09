import React from "react";
import "./HomeCard.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

/*  This component represents the Cards to be used
    in the home page. The stretched-link makes it 
    so that anywhere on the card–when clicked–will lead 
    to specified page. 
*/
const Card = (props) => {
	return (
		<div className="card border">
			<Link
				className="link"
				to={{
					pathname: props.link,
					state: { dataStructure: props.dataStructure },
				}}
			>
				<img class="card-img-top" src={props.image} />
				<h3 className="title pt-4">{props.title}</h3>
				<p className="subtitle"> {props.subtitle} </p>
			</Link>
		</div>
	);
};

export default Card;
