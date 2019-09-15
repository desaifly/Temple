import * as React from "react";
import Loading from "../Loading/Loading";
import { Link } from 'react-router-dom';
import { fadeIn } from "animate.css"


class SubMenu extends React.Component {
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

        // let localSettings = null;
        // Settings(["News.json"])
        //     .then(result => {
        //         localSettings = JSON.parse(result);
        //         this.setState({ Settings: localSettings })
        //     })
    }

    render() {
        const { Settings } = this.state;
        return (
            Settings
                ?
                <div className=" d-flex flex-wrap pt-2 pb-2 SubMenu w-100 animated fadeIn">
                    {
                        Settings.map((subMenuItem, i) => {

                            return (
                                <Link className="HoverLink SubMenuText ml-2 d-flex" to={subMenuItem.Path} >
                                    &nbsp;{subMenuItem.title} &nbsp;
                                    </Link>
                            )
                        })
                    }
                </div>
                : <div className="ImageSize2 ml-2 pl-2"><Loading /></div>


        )
    }
}
export default SubMenu
