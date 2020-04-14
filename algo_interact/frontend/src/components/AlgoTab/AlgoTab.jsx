import React, {useState} from 'react'
import {Tabs, Tab} from "react-bootstrap";
import './AlgoTab.css'
import Algorithm from './Algorithm';

//Renders Selected Algorithm 
const AlgoTab = () => {
    //sets current algorithm tab
    const [tabKey, setTabkey] = useState('Graph')
    
    return (
        <div>
        <div class='Tab'>
        <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={event => setTabkey(event)}
          >
            <Tab eventKey="Graph" title="Graph">
            </Tab>
            <Tab eventKey="Tree" title="Tree">
            </Tab>
            <Tab eventKey="LinkedList" title="Linked List">
            </Tab>
          </Tabs>
        </div>

        <Algorithm algoKey={tabKey} />
        </div>
    )
}

export default AlgoTab