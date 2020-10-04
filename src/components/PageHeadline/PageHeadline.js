import React, { Component } from 'react';
import styles from './PageHeadline.module.scss';

class PageHeadline extends Component {

    render() {
        return(
            <h1 className={styles.PageHeadline}>
                { this.props.children }
            </h1>
        )
    }
        
}

export default PageHeadline;