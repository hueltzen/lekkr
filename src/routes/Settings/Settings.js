import React, { Component } from 'react';
import styles from './Settings.module.scss';

import PageHeadline from '../../components/PageHeadline/PageHeadline';

class Settings extends Component {

    render() {
        return (
            <div className={styles.Settings}>

                <PageHeadline>
                    Your Settings
                </PageHeadline>

                <ol className={styles.Settings__List}>
                    <li className={styles.Settings__List__Item}>
                        <h2 className={styles.Settings__List__Item__Title}>You</h2>

                        <div className={styles.Settings__List__Item__Options}>
                            <div className={styles.Settings__List__Item__Options__Name}>
                                <input type="text" placeholder="Your Name"></input>
                            </div>
                        </div>
                    </li>
                    <li className={styles.Settings__List__Item}>
                        <h2 className={styles.Settings__List__Item__Title}>Dark Mode</h2>

                        <div className={styles.Settings__List__Item__Options}>
                            <div className={styles.Settings__List__Item__Options__Name}>
                                Turn on Dark Mode (Coming soon)
                            </div>
                            <div className={styles.Settings__List__Item__Options__Name}>
                                <input type="checkbox"></input>
                            </div>
                        </div>
                    </li>
                </ol>
                
            </div>
        )
    }

}

export default Settings;