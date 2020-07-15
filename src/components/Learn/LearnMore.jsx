import React, { Component } from "react";
import LearnCard from "./LearnCard";
import "./LearnMore.css";
import { NumberOutlined, TeamOutlined } from "@ant-design/icons";

/*
  The Learn page is where the user can navigate to 
  in order to learn more about each data structure 
  in the Visualizer page and their respective algorithms.
*/
class LearnMore extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			type: null,
		};
	}

	typeSetter(propsName) {
		var name, type;

		switch (propsName) {
			case "arrays-and-strings":
				name = "Arrays and Strings";
				type = "DATA_STRUCTURE";
				break;
			case "stacks-and-queues":
				name = "Stacks and Queues";
				type = "DATA_STRUCTURE";
				break;
			case "hash-tables":
				name = "Hash Tables";
				type = "DATA_STRUCTURE";
				break;
			case "linked-lists":
				name = "Linked Lists";
				type = "DATA_STRUCTURE";
				break;
			case "trees":
				name = "Trees";
				type = "DATA_STRUCTURE";
				break;
			case "graphs":
				name = "Graphs";
				type = "DATA_STRUCTURE";
				break;
			case "graph-algorithms":
				name = "Graph Algorithms";
				type = "ALGORITHM";
				break;
			case "tree-traversals":
				name = "Tree Traversals";
				type = "ALGORITHM";
				break;
		}
		this.setState({
			name: name,
			type: type,
		});
	}

	componentDidMount() {
		if (this.props.name) {
			this.typeSetter(this.props.name);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.name !== this.props.name && this.props.name) {
			this.typeSetter(this.props.name);
		}
	}

	render() {
		return (
			<div className="learnMorePageBox">
				<div className="learnMoreContainer">
					{this.state.type === "DATA_STRUCTURE" ? (
						<div className="learnMoreCardContainer">
							<LearnCard title="Arrays and Strings" subtitle="Learn About" name="arrays-and-strings" small={true} />
							<LearnCard title="Stacks and Queues" subtitle="Learn About" name="stacks-and-queues" small={true} />
							<LearnCard title="Hash Tables" subtitle="Learn About" name="hash-tables" small={true} />
							<LearnCard title="Linked Lists" subtitle="Learn About" name="linked-lists" small={true} />
							<LearnCard title="Trees" subtitle="Learn About" name="trees" small={true} />
							<LearnCard title="Graphs" subtitle="Learn About" name="graphs" small={true} />
						</div>
					) : (
						<div className="learnMoreCardContainer">
							<LearnCard title="Graph Algorithms" subtitle="Learn About" name="graph-algorithms" small={true} />
							<LearnCard title="Tree Traversals" subtitle="Learn About" name="tree-traversals" small={true} />
						</div>
					)}

					<div className="learnMidContainer">
						<div className="leftTabContainer">
							<NumberOutlined className="topicIcon" />
							<div className="topicLabel">Topics</div>
							<hr className="learnMoreTabLine"></hr>
						</div>
						<div className="learnContentContainer">
							<div className="learnLabel">
								<h2 className="learnText"> {this.state.name} </h2>
							</div>
							<hr className="learnMoreLine"></hr>
						</div>
						<div className="rightTabContainer">
							<TeamOutlined className="topicIcon" />
							<div className="topicLabel">Contributors</div>
							<hr className="learnMoreTabLine"></hr>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LearnMore;
