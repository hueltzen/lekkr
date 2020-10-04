import React, { Component } from 'react';
import styles from './BottomNavbar.module.scss';

import { Link } from 'react-router-dom';

import { ReactComponent as HomeIcon } from './home.svg';
import { ReactComponent as StoresIcon } from './stores.svg';
import { ReactComponent as GithubIcon } from './github.svg';

class BottomNavbar extends Component {

    render() {
        return(
            <div className={styles.BottomNavbar}>
                <div className={styles.container}>
                    <div className={ styles.BottomNavbar__Left }>
                        <Link to="/">
                            <HomeIcon />
                            <span className={styles.desktopOnly}>Home</span>
                        </Link>
                        <Link to="/stores">
                            <StoresIcon />
                            <span className={styles.desktopOnly}>Stores</span>
                        </Link>
                        </div>
                    <div className={ styles.BottomNavbar__Right }>
                        <a href="https://github.com/hueltzen/lekkr" target="_blank" rel="noopener noreferrer">
                            <GithubIcon />
                            <span className={styles.desktopOnly}>Github</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

}

export default BottomNavbar;