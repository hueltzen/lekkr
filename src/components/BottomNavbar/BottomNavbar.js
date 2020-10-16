import React from 'react';
import styles from './BottomNavbar.module.scss';

import { NavLink } from 'react-router-dom';

import { ReactComponent as ListsIcon } from './lists.svg';
import { ReactComponent as StoresIcon } from './stores.svg';
import { ReactComponent as SettingsIcon } from './settings.svg';
import { ReactComponent as SearchIcon } from './search.svg';

function BottomNavbar(props) {

    return(
        <div className={styles.BottomNavbar}>
            <div className={styles.container}>
                <NavLink exact to="/">
                    <ListsIcon />
                    <span className={styles.desktopOnly}>Home</span>
                </NavLink>
                <NavLink exact to="/stores">
                    <StoresIcon />
                    <span className={styles.desktopOnly}>Stores</span>
                </NavLink>
                <NavLink exact to="/settings">
                    <SettingsIcon />
                    <span className={styles.desktopOnly}>Settings</span>
                </NavLink>
            </div>
        </div>
    );

}

export default BottomNavbar;