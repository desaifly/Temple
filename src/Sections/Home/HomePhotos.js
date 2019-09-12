import * as React from "react";
import { Settings } from "../../Resources/Utility/Config";

class HomePhotos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
            position: props.position ? props.position : null,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.position !== prevProps.position) {
            this.setState({ position: this.props.position ? this.props.position : null });
        }
        if (this.props.Settings !== prevProps.Settings) {
            this.setState({ Settings: this.props.Settings ? this.props.Settings : null });
        }
    }
    componentDidMount() {

    }
    render() {
        const { Settings } = this.state;
        return (
            <div className="w-100 H-100" >

            </div>
        )
    }
}
export default HomePhotos
