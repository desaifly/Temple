import * as React from "react";
import { Link } from 'react-router-dom';
import Loading from "../Cards/Loading/Loading";



class SubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text ? props.text : null,
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text) {
            this.setState({ text: this.props.text ? this.props.text : null });
        }
    }

    render() {
        const { text } = this.state;
        return (
            <div className="d-flex w-100 justify-content-center SubHeader p-1">
                {
                    text
                        ? text
                        : <div className="d-flex ImageSize2 text-center"><Loading /></div>
                }
            </div>
        )
    }
}
export default SubHeader
