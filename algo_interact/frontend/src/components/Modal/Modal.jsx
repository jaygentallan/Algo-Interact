import React from "../../../node_modules/react";
import "./Modal.css"

const Modal = (props) => {
    return (
        <div class="modal-fade" 
            id={props.id}
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5>{props.modalTitle}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">{props.modalBody}</div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Modal;