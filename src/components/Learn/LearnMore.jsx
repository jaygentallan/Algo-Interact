import React, { Component } from "react";
import LearnCard from "./LearnCard";
import "./LearnMore.css";
import {} from "@ant-design/icons";

/*
  The Learn page is where the user can navigate to 
  in order to learn more about each data structure 
  in the Visualizer page and their respective algorithms.
*/
class LearnMore extends Component {
	constructor(props) {
		super(props);
		var name;

		switch (props.name) {
			case "arrays-and-strings":
				name = "Arrays and Strings";
				break;
			case "stacks-and-queues":
				name = "Stacks and Queues";
				break;
			case "hash-tables":
				name = "Hash Tables";
				break;
			case "linked-lists":
				name = "Linked Lists";
				break;
			case "trees":
				name = "Trees";
				break;
			case "graphs":
				name = "Graphs";
				break;
			case "graph-algorithms":
				name = "Graph Algorithms";
				break;
			case "tree-traversals":
				name = "Tree Traversal";
				break;
		}

		this.state = {
			name: name,
		};
	}

	render() {
		return (
			<div>
				<div className="learnMorePageBox">
					<div className="dataStructuresLabel">
						<h2 className="dataStructuresText"> {this.state.name} </h2>
					</div>
					<div className="leftTabContainer"></div>
					<div className="learnMoreContainer"></div>
					<div className="rightTabContainer"></div>
				</div>
			</div>
		);
	}
}

export default LearnMore;
