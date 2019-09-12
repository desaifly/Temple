import * as React from "react";
import $ from 'jquery';
import { isArrayNullOrEmpty, isNullOrUndefined } from "../verifying/verfyItems";
import icoCancel from '../../../Resources/Images/ico-delete.svg';

const basePath = "./Images";
function viewDialogBox(item, eventHandler, show) {


    if (!isNullOrUndefined(item)) {
        if (isArrayNullOrEmpty(item)) {
            return (
                <div className="modal animated fadeInTop" id="ParapetModal" >
                    <div className="d-flex modal-dialog modal-dialog-centered">
                        <div className="d-flex flex-grow-1 flex-column modal-content">
                            <div className="modal-header SubHeaderImageModal">
                                <span className="modal-title Heading-1White pl-2" id="exampleModalLabel">{item ? item.header : ""}</span>
                                <img src={icoCancel} className="ImageSize2" onClick={(e) => eventHandler("close")} />
                            </div>
                            <div className="modal-body">
                                <img className="img-fluid" src={item ? basePath + item.href : ""} alt={item ? item.header : ""} />
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
        } else {
            return (
                <div className="modal fade" id="ParapetModal" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header SubHeaderImageModal">
                                <span className="modal-title Heading-1White pl-2" id="exampleModalLabel">{item ? item.header : ""}</span>
                                <img src={icoCancel} className="ImageSize2" />
                            </div>
                            <div className="modal-body">
                                <img src={item ? item.href : ""} alt={item ? item.header : ""} />
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
        }
    } else {
        return null;
    }

}
export default viewDialogBox