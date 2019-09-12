import React, { Suspense, lazy } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { TopHeader } from './TopHeader';
import $ from 'jquery';
import HomePage from '../Sections/Home/HomePage';

class MainLayout extends React.Component {
    constructor(props) {
        ////console.log( ' IN THE Constructor' );
        super(props);
    }


    render() {

        return (
            <HashRouter>
                <div className="d-flex h-100 w-100">
                    <div className="d-flex flex-column w-100 h-100">
                        <div className="d-flex w-100">
                            <TopHeader />
                        </div>
                        <Suspense fallback={<div className="mx-auto text-center">Loading</div>}>
                            <div className="h-100">
                                <Switch>
                                    <Route path="/" render={(props) => (<HomePage />)} />
                                </Switch>
                            </div>
                        </Suspense>
                    </div>
                </div>
            </HashRouter>
        );

    }

}
export default MainLayout;
