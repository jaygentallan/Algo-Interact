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
					<LearnCard
						title="Arrays and Strings"
						subtitle="Learn About"
						image="https://algointeract.s3.amazonaws.com/static/images/array.png"
					/>
					<LearnCard
						title="Stacks and Queues"
						subtitle="Learn About"
						image="https://algointeract.s3.amazonaws.com/static/images/stackandqueue.png"
					/>
					<LearnCard title="Hash Tables" subtitle="Learn About" image="https://algointeract.s3.amazonaws.com/static/images/hashtable.png" />
					<LearnCard
						title="Linked Lists"
						subtitle="Learn About"
						image="https://algointeract.s3.amazonaws.com/static/images/linkedlist.png"
					/>
					<LearnCard title="Trees" subtitle="Learn About" image="https://algointeract.s3.amazonaws.com/static/images/tree.png" />
					<LearnCard title="Graphs" subtitle="Learn About" image="https://algointeract.s3.amazonaws.com/static/images/graphpicture.png" />
				</div>

				<div className="algorithmsLabel">
					<DeploymentUnitOutlined className="labelIcon" />
					<h2 className="algorithmsText"> Algorithms </h2>
				</div>
				<div className="learnContainer mb-5">
					<LearnCard
						title="Graph Algorithms"
						subtitle="Learn About"
						image="https://algointeract.s3.amazonaws.com/static/images/graphsearch.png"
					/>
					<LearnCard
						title="Tree Traversal"
						subtitle="Learn About"
						image="https://algointeract.s3.amazonaws.com/static/images/treetraversal.png"
					/>
				</div>
			</div>
		);
	}
}

export default Learn;
