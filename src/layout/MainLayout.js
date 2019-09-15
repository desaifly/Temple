import React, { Suspense, lazy } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { TopHeader } from './TopHeader';
import Loading from '../Cards/Loading/Loading';

const GenericPage = lazy(() => import('../Sections/Generic/GenericPage'));
const Events = lazy(() => import('../Sections/Events/Events'));
const News = lazy(() => import('../Sections/News/News'));
const HomePage = lazy(() => import('../Sections/Home/HomePage'));

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
                        <Suspense fallback={<div className="mx-auto text-center ImageSize3"><Loading /></div>}>
                            <div className="h-100">
                                <Switch>
                                    <Route exact path="/News" render={(props) => (<News />)} />
                                    <Route exact path="/GP/:page" render={(props) => (<GenericPage prefix="GenericPages" page={props.match.params.page} />)} />
                                    <Route exact path="/:prefix/:page" render={(props) => (<GenericPage prefix={props.match.params.prefix} page={props.match.params.page} />)} />
                                    <Route exact path="/Events" render={(props) => (<Events />)} />
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
