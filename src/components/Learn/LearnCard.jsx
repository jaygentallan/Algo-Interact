import React from "react";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

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
			<img class="card-img-top" src={props.image} />
			<h3 className="learnTitle">{props.title}</h3>
			<p className="learnSubtitle"> {props.subtitle} </p>
		</div>
	);
};

export default LearnCard;
