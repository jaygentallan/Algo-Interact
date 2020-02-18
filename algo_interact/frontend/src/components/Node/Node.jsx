import React from 'react'
import './Node.css'
import Draggable from './Draggable.jsx'


const Node = () => {

    return(
            <div className='circle-container'>
                <Draggable>
                    <div className='circle center shadow'></div>
                </Draggable> 
            </div>
    )
}

export default Node