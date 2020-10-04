import React, { Component } from 'react';
import styles from './ExpandableListItem.module.scss';

class ExpandableListItem extends Component {

    render() {
        return(
            <div className={styles.ExpandableListItem}>
                { this.props.children }
            </div>
        );
    }

}

export default ExpandableListItem;