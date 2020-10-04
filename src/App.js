import React, { Component, createRef } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import styles from './App.module.scss';

import Home from './routes/Home/Home';
import SingleList from './routes/SingleList/SingleList';
import Stores from './routes/Stores/Stores';
import Settings from './routes/Settings/Settings';
import FAQ from './routes/FAQ/FAQ';

import { ReactComponent as Logo } from './logo.svg';

import Menu from './components/Menu/Menu';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';

class App extends Component {

    constructor(props) {
        super(props);

        this.openMenu = this.openMenu.bind(this);

        this.menu = createRef();
    }

    render() {
        return (
            <div className={styles.App}>
                <Router>
                    <div className={styles.App__Branding}>
                        <Link to="/">
                            <Logo className={styles.App__Branding__Logo} />
                        </Link>
                    </div>

                    <Menu 
                        ref={this.menu}/>

                    <Switch>
                        <Route path="/faq" component={FAQ} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/stores" component={Stores} />
                        <Route path="/list/:uuid" component={SingleList} />
                        <Route path="/" component={Home}></Route>
                    </Switch>

                    <BottomNavbar />

                </Router>
            </div>
        );
    }

    openMenu() {
        this.menu.current.open();
    }

}

export default App;
