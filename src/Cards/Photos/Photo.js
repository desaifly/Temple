import * as React from "react";
import Loading from "../Loading/Loading";
import $ from 'jquery';
import { fadeIn } from "animate.css"

const basePath = "./Images";
class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: props.Settings ? props.Settings : null,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.Settings !== prevProps.Settings) {
            this.setState({ Settings: this.props.Settings ? this.props.Settings : null });
        }
    }
    componentDidMount() {

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        // Initialize popover component
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }
    render() {
        const { Settings } = this.state;
        return (

            <div className="d-flex w-100 h-100 justify-content-center" >
                {
                    Settings
                        ? <div className="d-flex w-100 h-100 flex-column">
                            <img className="img-fluid animated fadeIn slow" src={Settings ? basePath + Settings.href : null} alt={Settings.header}
                                rel="popover" data-container="body" data-toggle="popover" data-placement="auto" data-html="true" data-trigger="hover" data-content={Settings ? '<span ClassName="subtextgrey"> ' + Settings.header + ' </span>' : ''}
                            />
                        </div>
                        : <div className="ImageSize2 pl-2"><Loading /></div>
                }
            </div>
        )
    }
}
export default Photo
