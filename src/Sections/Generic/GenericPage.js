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



class GenericPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
            page: this.props.page ? this.props.page : null,
            prefix: props.prefix ? props.prefix : null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            this.setState({ page: this.props.page ? this.props.page : null });
        }
        if (this.props.prefix !== prevProps.prefix) {
            this.setState({ prefix: this.props.prefix ? this.props.prefix : null });
        }
    }

    componentDidMount() {

        const { page, prefix } = this.state;
        let fileName = prefix ? prefix + "/" + page + ".json" : page + ".json";
        Settings([fileName])
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
            <div className="d-flex flex-column w-100 h-100  " >
                <SubHeader text={Settings && Settings.subHeaderText ? Settings.subHeaderText : null} />
                <div className="d-flex w-100 h-100">
                    <div className="d-flex flex-grow-1 h-100">
                        <div className="d-flex flex-column h-100 m-2">
                            {Settings && Settings.subMenu ? <div className="d-flex w-100"><SubMenu Settings={Settings.subMenu} /></div> : null}
                            {
                                Settings && Settings.contentSections
                                    ? Settings.contentSections.map((section, i) => {
                                        if (section.BlockType === "html") {
                                            return (<div className="d-flex flex-column m-1 mb-2 animated fadeIn">
                                                {section.Title ? this.getSectionTitle(section.Title) : null}
                                                <HTMLDisplay value={section.content} />
                                                {i !== Settings.contentSections.length - 2 ? this.getBlockHR() : null}
                                            </div>
                                            )
                                        }
                                        if (section.BlockType === "EventCalender") {
                                            return (<div className="d-flex flex-column m-1 mb-2">
                                                <div className="mb-3">{section.Title ? this.getSectionTitle(section.Title) : null}</div>
                                                <div className="ml-3 mr-3"> <Calendar /></div>
                                                {i !== Settings.contentSections.length - 1 ? this.getBlockHR() : null}
                                            </div>
                                            )
                                        }
                                        if (section.BlockType === "NewsList") {
                                            return (<div className="d-flex flex-column m-1 mb-2 w-100">
                                                {section.Title ? this.getSectionTitle(section.Title) : null}
                                                <div className="d-flex flex-column ml-1 mt-2 animated fadeIn">
                                                    <NewsList />
                                                    {i !== Settings.contentSections.length - 1 ? this.getBlockHR() : null}
                                                </div>

                                            </div>
                                            )
                                        }
                                    })
                                    : <div className="ImageSize2 "><Loading /></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default GenericPage
