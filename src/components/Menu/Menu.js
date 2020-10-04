import React, { Component } from 'react';

import styles from './Menu.module.scss';

import { Link } from 'react-router-dom';

import { ReactComponent as CloseIcon } from './close.svg';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.state = ({
            show: false
        });
    }

    render() {
        return(
            <nav className={styles.Menu + ' ' + (this.state.show ? styles.Menu__open : '')}>
                <ul>
                    <li className={styles.Menu__lekkr}>
                        <Link to="/" onClick={this.close}>lekkr</Link>
                    </li>
                    <li>
                        <Link 
                            to="/stores" 
                            onClick={this.close}>
                            Stores
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/about" 
                            onClick={this.close}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/faq" 
                            onClick={this.close}>
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <a 
                            href="https://github.com/hueltzen/lekkr" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={this.close}>
                            Github
                        </a>
                    </li>
                </ul>

                <button 
                    className={styles.Menu__CloseButton}
                    onClick={this.close}>
                    <CloseIcon />
                </button>
            </nav>
        )
    }

    open() {
        this.setState({
            ...this.state,
            show: true
        });
    }

    close() {
        this.setState({
            ...this.state,
            show: false
        });
    }

}

export default Menu;