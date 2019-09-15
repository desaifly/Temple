import * as React from "react";
import icoCancel from '../../Resources/Images/ico-delete.svg';
import Loading from "../Loading/Loading";
import Photo from "./Photo";
import $ from 'jquery';
import ImagePopover from "../../Resources/Utility/popover/ImagePopover";




class PhotoGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: props.Settings ? props.Settings : null,
            showinModal: props.showinModal ? props.showinModal : false,
            refresh: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.Settings !== prevProps.Settings) {
            this.setState({ Settings: this.props.Settings ? this.props.Settings : null });
        }
        // if (this.props.showinModal !== prevProps.showinModal) {
        //     this.setState({ showinModal: this.props.showinModal ? this.props.showinModal : null });
        // }
    }
    componentDidMount() {

    }

    showModalbox(item) {
        this.setState({ showinModal: true });
    }

    eventHandler(type) {
        if (type === "close") {
            this.setState({ showinModal: false });
        }
    }
    render() {
        const { Settings, showinModal } = this.state;
        this.state['refresh'] = false;
        return (
            <div className="d-flex w-100 h-100 justify-content-center m-1" >
                {Settings
                    ? Settings.sectionLabel
                        ? <div className="d-flex w-100 h-100 flex-column p-1" onClick={() => this.showModalbox(Settings)}>
                            <div className="d-inline-block w-100 text-truncate">{Settings ? Settings.sectionDescription : null}</div>
                            <div className="d-flex flex-wrap">
                                <div className="d-inline-flex HoverLink PhotoGroupViwAll mr-3 p-2" >
                                    View All Photos
                                </div>
                                <div className="d-inline-flex HoverLink PhotoGroupSection"><Photo Settings={Settings.Photos[0]} /></div>
                            </div>
                        </div>
                        : <div className="d-flex w-100 h-100 flex-column border border-secondary rounded p-1" onClick={() => this.showModalbox(Settings)}>
                            <div className="d-flex w-100 h-100"><Photo Settings={Settings} /></div>
                            <div className="d-inline-block w-100 text-truncate">{Settings ? Settings.header : null}</div>

                        </div>
                    : <div className="ImageSize2 pl-2"><Loading /></div>
                }
                {Settings && showinModal === true
                    ? <ImagePopover Settings={Settings.Photos} open={showinModal} eventHandler={this.eventHandler.bind(this)} />
                    : null
                }
            </div>
        )
    }
}
export default PhotoGroup
