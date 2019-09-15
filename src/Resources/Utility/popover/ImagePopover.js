import * as React from "react";
import $ from 'jquery';
import { isArrayNullOrEmpty, isNullOrUndefined } from "../verifying/verfyItems";
import icoCancel from '../../../Resources/Images/ico-delete.svg';
import Modal from 'react-responsive-modal';
import icoArrow from '../../Images/ico-arrow.svg';
import { fadeIn } from "animate.css"


const basePath = "./Images";
class ImagePopover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.Settings ? props.Settings : null,
            open: props.open ? props.open : false,
            imageIndex: 0,
        }
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.Settings !== prevProps.Settings) {
            this.setState({ item: this.props.Settings ? this.props.Settings : null });
        }
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open ? this.props.open : null });
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.props.eventHandler("close");
    };
    componentDidUpdate(prevProps) {
        if (this.props.Settings !== prevProps.Settings) {
            this.setState({ item: this.props.Settings ? this.props.Settings : null });
        }

    }

    render() {
        const { item, open, imageIndex } = this.state;
        if (!isNullOrUndefined(item)) {
            if (!isArrayNullOrEmpty(item)) {
                return (
                    <Modal open={open} center onClose={this.onCloseModal} closeIconSize={0}>

                        {
                            item
                                ? <div className="d-flex flex-column w-100 animated fadeIn">
                                    <div className="d-flex w-100 justify-content-between SubHeaderImageModal p-1 animated fadeIn">
                                        <span className="pl-2" id="exampleModalLabel">Here {item[imageIndex] ? item[imageIndex].header : ""}</span>
                                        <img src={icoCancel} className="ImageSize2 float-right" onClick={(e) => this.onCloseModal()} />
                                    </div>
                                    <div className="d-flex animated fadeIn">
                                        <img key={"image-" + imageIndex} className="img-fluid animated fadeIn slow" src={item[imageIndex] ? basePath + item[imageIndex].href : ""} alt={item[imageIndex] ? item[imageIndex].header : ""} />
                                    </div>
                                    <div className="d-flex w-100 mt-1 justify-content-between animated fadeIn">
                                        {imageIndex >> 0
                                            ? <img className="img-fluid RotateImg180 ImageSize2 " onClick={() => this.setState({ imageIndex: imageIndex - 1 })} src={icoArrow} />
                                            : null
                                        }

                                        {imageIndex <= item.length - 2
                                            ? <div className="d-flex w-100 justify-content-end" >< img className="ImageSize2" onClick={() => this.setState({ imageIndex: imageIndex + 1 })} src={icoArrow} /></div>
                                            : null
                                        }
                                    </div>
                                </div>
                                : null
                        }

                    </Modal >
                );
            } else {
                return (
                    <Modal open={open} center onClose={this.onCloseModal} closeIconSize={0}>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex w-100 justify-content-between SubHeaderImageModal p-1">
                                <span className="pl-2" id="exampleModalLabel">{item ? item.header : ""}</span>
                                <img src={icoCancel} className="ImageSize2 float-right" onClick={(e) => this.onCloseModal()} />
                            </div>
                            <div className="d-flex">
                                <img className="img-fluid" src={item ? basePath + item.href : ""} alt={item ? item.header : ""} />
                            </div>
                        </div>

                    </Modal>

                );
            }
        } else {
            return null;
        }

    }

}
export default ImagePopover