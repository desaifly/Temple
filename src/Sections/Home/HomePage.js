import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

import { Settings } from "../../Resources/Utility/Config";
import Loading from "../../Cards/Loading/Loading";

import { fadeIn } from "animate.css"


const SubMenu = lazy(() => import('../../Cards/SubMenu/subMenu'));
const NewsList = lazy(() => import('../../Cards/News/NewsList'));
const Calendar = lazy(() => import('../../Cards/Events/Calendar'));
const SubHeader = lazy(() => import('../../layout/SubHeader'));
const HTMLDisplay = lazy(() => import('../../Cards/HTMLDisplay'));
const PhotoGroup = lazy(() => import('../../Cards/Photos/PhotoGroup'));

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
        }
    }

    componentDidMount() {

        Settings(['HomePage.json'])
            .then(res => {
                this.setState({ Settings: JSON.parse(res) })
            })
    }
    getBlockHR() {
        return (<div className="d-flex pt-4 w-100 justify-content-center align-items-center"><div className="w-50 ContentBottomLine"></div></div>)
    }

    getSectionTitle(title) {
        return (
            <div className="d-flex justify-content-center w-100"> <div className="BlockTitle p-2">{title}</div> </div>
        )
    }

    render() {
        const { Settings } = this.state;
        return (
            <div className="d-flex flex-column w-100 h-100" >
                <SubHeader text={Settings && Settings.subHeaderText ? Settings.subHeaderText : null} />
                <div className="d-flex w-100 h-100">
                    <div className="d-none d-lg-flex flex-column h-100 align-items-start p-2">
                        {
                            Settings
                                ?
                                Settings.PhotoGroup.Photos.map(photoItem => {
                                    return (<div className="d-flex LeftPhoto m-1"><PhotoGroup Settings={photoItem} /></div>)
                                })
                                : <div className="ImageSize2 "><Loading /></div>
                        }

                    </div>
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
                                                <div className="ml-3 mr-3"> <Calendar viewType={section.viewType ? section.viewType : null} /></div>
                                                {i !== Settings.contentSections.length - 1 ? this.getBlockHR() : null}
                                            </div>
                                            )
                                        }
                                        if (section.BlockType === "NewsList") {
                                            return (<div className="d-flex flex-column m-1 mb-2 w-100">
                                                {section.Title ? this.getSectionTitle(section.Title) : null}
                                                <div className="d-flex flex-column ml-1 mt-2 animated fadeIn">
                                                    <NewsList itemsToShow={section.numberOfNewsToDisplay ? section.numberOfNewsToDisplay : null} />
                                                    {i !== Settings.contentSections.length - 1 ? this.getBlockHR() : null}
                                                </div>

                                            </div>
                                            )
                                        }
                                        if (section.BlockType === "PhotoGroup") {
                                            return (
                                                <div className="d-flex flex-column m-1 mb-2 w-100">
                                                    {section.Title ? this.getSectionTitle(section.Title) : null}
                                                    <div className="mt-1"><PhotoGroup Settings={section} /></div>
                                                </div>
                                            );
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
export default HomePage
