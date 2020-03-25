import React from "../../../node_modules/react";
import "./Card.css";

/*  stretched-link makes it so that anywhere on 
    the card–when clicked–will lead to the page
    specified. 
*/
const Card = (props) => {
    return (
        <div class="card border shadow>Regular shadow"> 
            <div class="card-body card-text">
                <img class="card-img-top" src={props.image}/>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
                <a class="card-block stretched-link" href={props.link}></a> 
            </div>
        </div>
    )
};

export default Card;