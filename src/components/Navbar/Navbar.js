import React, { Component } from 'react';
import styles from './Navbar.module.scss';

class Navbar extends Component {

    render() {
        return(
            <nav className={styles.Navbar}>
                { this.props.children }
            </nav>
        )
    }
        
}

export default Navbar;