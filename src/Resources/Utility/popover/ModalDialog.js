import * as React from "react";
import { isNullOrUndefined } from "../verifying/verfyItems";
import $ from 'jquery';

function viewDialogBox(item, eventHandler, show) {


    if (!isNullOrUndefined(item)) {
        return (
            <div className="modal fade" id="ParapetModal" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header SubHeader-1Background">
                            <span className="modal-title Heading-1White pl-2" id="exampleModalLabel">{item ? item.Title : ""}</span>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body Heading-3">
                            {item ? item.Content : ""}
                        </div>
                        <div className="modal-footer">
                            {
                                item ? item.Buttons ? item.Buttons.map((btn, i) => {
                                    return <button key={'button-' + i} type="button" value={btn.Value} onClick={(e) => eventHandler(btn.Value)} className={btn.ClassName} data-dismiss="modal">{btn.Title}</button>
                                }) : "" : ""
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    } else { return null; }

}
export default viewDialogBox