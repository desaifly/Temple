import * as React from "react";
import { Link } from 'react-router-dom';
import SubHeader from "../../layout/SubHeader";
import { Settings } from "../../Resources/Utility/Config";
import Loading from "../../Cards/Loading/Loading";
import PhotoGroup from "../../Cards/Photos/PhotoGroup";
import { fadeIn } from "animate.css"
import { HTMLDisplay } from "../../Cards/HTMLDisplay";
import Calendar from "../../Cards/Events/Calendar";
import NewsList from "../../Cards/News/NewsList";
import SubMenu from "../../Cards/SubMenu/subMenu";



class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
        }
    }

    componentDidMount() {

        Settings(['Events.json'])
            .then(res => {
                this.setState({ Settings: JSON.parse(res) })
            })
    }
    getBlockHR() {
        return (<div className="d-flex pt-4 w-100 justify-content-center align-items-center"><div className="w-50 ContentBottomLine"></div></div>)
    }

    getSectionTitle(title) {
        return (
            <div className="d-flex justify-content-center w-100"> <div className="BlockTitle">{title}</div> </div>
        )
    }

    render() {
        const { Settings } = this.state;
        return (
            <div className="d-flex flex-column w-100 h-100" >
                <SubHeader text={Settings && Settings.subHeaderText ? Settings.subHeaderText : null} />
                <div className="d-flex flex-column w-100">
                    <div className="m-2">{Settings && Settings.subMenu ? <div className="d-flex w-100"><SubMenu Settings={Settings.subMenu} /></div> : null}</div>
                    <div className="d-flex m-2">
                        {Settings
                            ?
                            <div className="ml-3 mr-4"> <Calendar viewType={Settings.viewType ? Settings.viewType : null} /></div>
                            : <div className="ImageSize2 "><Loading /></div>
                        }
                    </div>
                    <div className="d-flex h-100"></div>
                </div>

            </div>
        )
    }
}
export default Events
