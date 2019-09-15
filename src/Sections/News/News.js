import * as React from "react";
import SubHeader from "../../layout/SubHeader";
import { Settings } from "../../Resources/Utility/Config";
import Loading from "../../Cards/Loading/Loading";
import { fadeIn } from "animate.css"
import HTMLDisplay from "../../Cards/HTMLDisplay";
import NewsList from "../../Cards/News/NewsList";
import SubMenu from "../../Cards/SubMenu/subMenu";

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
        }
    }
    componentDidMount() {

        Settings(['News.json'])
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
                                })
                                : <div className="ImageSize2 "><Loading /></div>
                        }
                    </div>
                    <div className="d-flex h-100"></div>
                </div>

            </div>
        )
    }
}
export default News
