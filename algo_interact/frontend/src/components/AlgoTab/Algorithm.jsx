import React from 'react'
import GraphVisualizer from '../Visualizer/Graph/GraphVisualizer'
import LinkedList from '../Visualizer/LinkedList/LinkedListVisualizer'
import Tree from '../Visualizer/Tree/TreeVisualizer'

/*AlgoTab passes current tabKey 
so Algorithm knows which component to render */
const Algorithm = (props) => {
    //Selected Algo Component is stored into this variable
    let selectedAlgo = null
    //Conditional Rendering 
    if (props.algoKey === 'LinkedList') {
        selectedAlgo = <LinkedList/>
    } else if (props.algoKey === 'Tree') {
        selectedAlgo = <Tree/>
    } else {
        selectedAlgo = <GraphVisualizer/> //Graph by default
    }

    return(
        <div>
            {selectedAlgo}
        </div>
    )
}

export default Algorithm