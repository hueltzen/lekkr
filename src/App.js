import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { AnimatePresence } from  'framer-motion';

import { connect } from 'react-redux';

import styles from './App.module.scss';

import Home from './routes/Home/Home';
import SingleList from './routes/SingleList/SingleList';
import Stores from './routes/Stores/Stores';
import Settings from './routes/Settings/Settings';

import BottomNavbar from './components/BottomNavbar/BottomNavbar';

const mapStateToProps = state => {
    return { isDarkModeEnabled: state.isDarkModeEnabled }
};

function App(props) {

    return (
        <div>
            {props.isDarkModeEnabled &&
                <style>
                    {`:root {
                        --background-color: rgb(0, 0, 0);
                        --foreground-color: rgb(245, 245, 245);
                    }
                    html {
                        background: rgb(0, 0, 0);
                    }`}
                </style>
            }
            {!props.isDarkModeEnabled &&
                <style>
                    {`:root {
                        --background-color: rgb(245, 245, 245);
                        --foreground-color: rgb(0, 0, 0);
                    }
                    html {
                        background: rgb(245, 245, 245);
                    }`}
                </style>
            }
            <div className={styles.App + ' ' + (props.isDarkModeEnabled ? 'darkmode' : '')}>
                <Router>

                    <AnimatePresence exitBeforeEnter>
                        <Switch>
                            <Route path="/settings" component={Settings} />
                            <Route path="/stores" component={Stores} />
                            <Route path="/list/:uuid" component={SingleList} />
                            <Route path="/" component={Home}></Route>
                        </Switch>
                    </AnimatePresence>

                    <BottomNavbar />

                </Router>
            </div>
        </div>
    );

}

export default connect(
    mapStateToProps
)(App);