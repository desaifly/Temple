import * as React from "react";
import ReactHtmlParser from 'react-html-parser';
import { fadeIn } from 'animate.css';



class HTMLDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : null,
            divClass: props.divClass ? props.divClass : null,
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.value !== prevProps.value) {
            this.setState({ value: this.props.value ? this.props.value : null })
        }
        if (this.props.divClass !== prevProps.divClass) {
            this.setState({ divClass: this.props.divClass ? this.props.divClass : null })
        }
    }

    render() {

        const { value, divClass } = this.state;


        return (
            <div className="animated fadeIn">

                {
                    value
                        ? value.substring(0, 3).toLowerCase() === "<p>" && value.substring(value.length - 4).toLowerCase() === "</p>"
                            ? ReactHtmlParser(value.substring(3, value.length - 4))
                            : ReactHtmlParser(value)
                        : null
                }
            </div>

        );
    }

}
export default HTMLDisplay;