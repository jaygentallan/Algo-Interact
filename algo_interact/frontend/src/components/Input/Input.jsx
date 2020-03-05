import React, {useState} from 'react'
import D3Node from '../d3Node/D3Node'
import './Input.css'

const Input = ({createNode, handleConfig}) => {
    
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [shape, setShape] = useState('')
    const [target, setTarget] = useState('')

    const inputHandler = (event) => {
        //prevent the forn submission from refreshing the page
        event.preventDefault() 
        console.log(target)
        createNode(name, target)
        handleConfig(color, shape)

        //reset inputs
        setName('')
    }


    return(
        <div className='form grid'>
            <form onSubmit={inputHandler}>
                
                <label class='nameL' htmlFor='name'>Name</label>
                <input
                    class='name'
                    type='text'
                    label="Name"
                    value={name}
                    placeholder='Enter a Name'
                    required onChange={(e) => setName(e.target.value)}
                />
             
                <select class='color' id='color' onChange={ (e) => setColor(document.getElementById('color').value)}>
                    <option value='default'>Color</option>
                    <option value='lightgreen'>lightgreen</option>
                    <option value='blue'>blue</option>
                    <option value='red'>red</option>
                    <option value='orange'>orange</option>
                    <option value='purple'>purple</option>
                    <option value='yellow'>yellow</option>
                </select>

                
                <select class='shape' id='shape' onChange={ (e) => setShape(document.getElementById('shape').value)}>
                    <option value='default'>Shape</option>
                    <option value='circle'>circle</option>
                    <option value='diamond'>diamond</option>
                    <option value='square'>square</option>
                    <option value='star'>star</option>
                    <option value='triangle'>triangle</option>
                </select>

                <select class='connect' id='connect' onChange={ (e) => setTarget(document.getElementById('connect').value)}>
                    <option value='default'>Target</option>
                    <option value='Harry'>Harry</option>
                    <option value='Sally'>Sally</option>
                    <option value='Alice'>Alice</option>
                </select>

            <input class='submit' type='submit' value='Create Node'/>
            </form>
        </div>
    )
}

export default Input