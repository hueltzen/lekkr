import React from 'react';
import styles from './PageHeadline.module.scss';

function PageHeadline(props) {

    return(
        <h1 className={styles.PageHeadline}>
            { props.children }
        </h1>
    );
        
}

export default PageHeadline;