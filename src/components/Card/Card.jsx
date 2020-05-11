import React from "../../../node_modules/react";
import "./Card.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

/*  This component represents the Cards to be used
    in the home page. The stretched-link makes it 
    so that anywhere on the card–when clicked–will lead 
    to specified page. 
*/
const Card = (props) => {
  return (
    <div class="card border shadow>Regular shadow">
      <Link
        className="link"
        to={{
          pathname: props.link,
          state: { dataStructure: props.dataStructure },
        }}
      >
        <div class="card-body card-text">
          <img class="card-img-top" src={props.image} />
          <h3 className="title font-weight-normal pt-4">{props.title}</h3>
          <p>{props.text}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
