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
	const [isOpen, setIsOpen] = React.useState(false);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	return (
		<div className="learn card border" onClick={showModal}>
			<Link
				className="learn link"
				to={{
					pathname: "/learn/" + props.name,
					//state: { id: props.id, user: props.user },
				}}
			>
				<img class="card-img-top" src={process.env.PUBLIC_URL + "static/images/" + props.name + ".png"} />
				<h3 className="learnTitle">{props.title}</h3>
				<p className="learnSubtitle"> {props.subtitle} </p>
			</Link>
		</div>
	);
};

export default LearnCard;
