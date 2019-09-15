import * as React from "react";
import Loading from "../Loading/Loading";
import { fadeIn } from "animate.css"
import { Settings } from "../../Resources/Utility/Config";

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
            itemsToShow: props.itemsToShow ? props.itemsToShow : 3,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemsToShow !== prevProps.itemsToShow) {
            this.setState({ itemsToShow: this.props.itemsToShow ? this.props.itemsToShow : null });
        }
    }
    componentDidMount() {

        let localSettings = null;
        Settings(["News.json"])
            .then(result => {
                localSettings = JSON.parse(result).News;
                this.setState({ Settings: localSettings })
            })
    }

    render() {
        const { Settings, viewModel, itemsToShow } = this.state;
        return (



            Settings
                ?
                Settings.map((newsItem, i) => {
                    return (
                        i < itemsToShow
                            ?
                            <div className="m-2 animated fadeIn">
                                <div className="NewsTitle d-inline-flex ml-2 pt-1 pb-1 pl-2 pr-2">{newsItem.title}</div>
                                <div className="d-inline-flex ml-2 pl-2 pr-2">{newsItem.description}</div>
                            </div>
                            : itemsToShow === 0
                                ? <div className="m-2 animated fadeIn">
                                    <div className="NewsTitle d-inline-flex ml-2 pt-1 pb-1 pl-2 pr-2">{newsItem.title}</div>
                                    <div className="d-inline-flex ml-2 pl-2 pr-2">{newsItem.description}</div>
                                </div>
                                : null
                    )
                })
                : <div className="ImageSize2 ml-2 pl-2"><Loading /></div>


        )
    }
}
export default NewsList
