import React, { Component } from "../../../node_modules/react";
import LearnCard from "./LearnCard";
import "./Learn.css";
import { ApartmentOutlined, DeploymentUnitOutlined } from "@ant-design/icons";

/*
  The Learn page is where the user can navigate to 
  in order to learn more about each data structure 
  in the Visualizer page and their respective algorithms.
*/
class Learn extends Component {
	render() {
		return (
			<div className="learnPageBox">
				<div className="dataStructuresLabel">
					<ApartmentOutlined className="labelIcon" />
					<h2 className="dataStructuresText"> Data Structures </h2>
				</div>
				<div className="learnContainer">
					<LearnCard title="Arrays and Strings" subtitle="Learn About" name="arrays-and-strings" />
					<LearnCard title="Stacks and Queues" subtitle="Learn About" name="stacks-and-queues" />
					<LearnCard title="Hash Tables" subtitle="Learn About" name="hash-tables" />
					<LearnCard title="Linked Lists" subtitle="Learn About" name="linked-lists" />
					<LearnCard title="Trees" subtitle="Learn About" name="trees" />
					<LearnCard title="Graphs" subtitle="Learn About" name="graphs" />
				</div>

				<div className="algorithmsLabel">
					<DeploymentUnitOutlined className="labelIcon" />
					<h2 className="algorithmsText"> Algorithms </h2>
				</div>
				<div className="learnContainer mb-5">
					<LearnCard title="Graph Algorithms" subtitle="Learn About" name="graph-algorithms" />
					<LearnCard title="Tree Traversals" subtitle="Learn About" name="tree-traversals" />
				</div>
			</div>
		);
	}
}

export default Learn;
