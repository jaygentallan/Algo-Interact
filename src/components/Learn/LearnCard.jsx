import React from "react";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";

import "./LearnCard.css";
import { TabContent } from "react-bootstrap";

/*  The Learn page will have LearnCards that will show a
    pop-up modal window when clicked. The modals contain
    tabs that organizes the information. 
*/
const LearnCard = (props) => {
	if (props.small) {
		return (
			<div className="learnCardSmall">
				<Link
					className="learn link"
					to={{
						pathname: "/learn/" + props.name,
						//state: { id: props.id, user: props.user },
					}}
				>
					<img className="learnCardImage" src={process.env.PUBLIC_URL + "/static/images/" + props.name + ".png"} />
					<h3 className="learnTitleSmall">{props.title}</h3>
				</Link>
			</div>
		);
	} else {
		return (
			<div className="learnCard">
				<Link
					className="learn link"
					to={{
						pathname: "/learn/" + props.name,
						//state: { id: props.id, user: props.user },
					}}
				>
					<img className="learnCardImage" src={process.env.PUBLIC_URL + "/static/images/" + props.name + ".png"} />
					<h3 className="learnTitle">{props.title}</h3>
					<p className="learnSubtitle"> {props.subtitle} </p>
				</Link>
			</div>
		);
	}
};

export default LearnCard;
