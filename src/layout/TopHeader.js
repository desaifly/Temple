import * as React from "react";
//import { table, tr, td } from 'bootstrap';
import { Link } from 'react-router-dom';

import { fadeIn } from "animate.css"
import { Settings } from "../Resources/Utility/Config";
import Loading from "../Cards/Loading/Loading";
import { isTemplateElement } from "@babel/types";



export class TopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Settings: null,
        }
    }

    componentDidMount() {

        Settings(['TopHeader.json'])
            .then(res => {
                this.setState({ Settings: JSON.parse(res) })
            })



    }

    render() {
        const { Settings } = this.state;
        return (
            <div classNameName="d-flex w-100 Header-1Background w-100 justify-content-between animated fadeIn" >

                {Settings
                    ?
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                {
                                    Settings.navItems.map(menuItem => {
                                        return (<li className="nav-item active">
                                            <a className="nav-link" href={menuItem.href}>{menuItem.label} <span className="sr-only">(current)</span></a>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                    : <div className="ImageSize2 pl-2"><Loading /></div>
                }

            </div >);
    }
}