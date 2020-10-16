import React from 'react';
import styles from './Button.module.scss';

function Button(props) {

    return (
        <button className={styles.Button}>
            { this.props.children }
        </button>
    );
        
}

export default Button;