import React from "../../../node_modules/react";
import "./LearnCard.css";

/*  The Learn page will have LearnCards that will show a
    pop-up modal window when clicked.
*/
const LearnCard = (props) => {
    return (
        <div class="card border shadow>Regular shadow"> 
            <div class="card-body card-text">
                <img class="card-img-top" src={props.image}/>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#moreInfo">
                    More Info
                </button>
                <div 
                    class="modal fade" 
                    id="moreInfo" 
                    tabindex="-1" 
                    role="dialog" 
                    aria-labelledby="exampleModalScrollableTitle" 
                    aria-hidden="true"
                    >
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="moreInfo">{props.modalTitle}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">{props.modalBody}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LearnCard;