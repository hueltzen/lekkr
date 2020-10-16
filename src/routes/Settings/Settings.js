import React from 'react';
import styles from './Settings.module.scss';

import { connect } from 'react-redux';
import { setDarkMode } from '../../actions/ListActions';

import { motion } from  'framer-motion';
import PageTransition from '../PageTransitions';

import PageHeadline from '../../components/PageHeadline/PageHeadline';

import { ReactComponent as LinkIcon } from './link.svg';

const mapStateToProps = state => {
    return { isDarkModeEnabled: state.isDarkModeEnabled }
}

const mapDispatchToProps = dispatch => {
    return {
        setDarkMode: enabled => dispatch(setDarkMode(enabled))
    }
};

function Settings(props) {

    function toggleDarkMode(e) {

        console.log('toggle dark mode');
        props.setDarkMode({
            enabled: !props.isDarkModeEnabled
        });

    }

    return (
        <motion.div
            className={styles.Settings}
            variants={PageTransition}
            initial="out"
            animate="in"
            exit="out"
            transition="transition">

            <PageHeadline>
                Settings
            </PageHeadline>

            <ol className={styles.Settings__List}>
                <li className={styles.Settings__List__Item}>
                    <h2 className={styles.Settings__List__Item__Title}>General</h2>

                    <label 
                        className={styles.Settings__List__Item__Options}
                        htmlFor="darkMode">
                        <div className={styles.Settings__List__Item__Options__Name}>
                            Dark Mode
                        </div>
                        <div 
                            className={
                                styles.Settings__List__Item__Options__Switch + ' ' 
                                + (props.isDarkModeEnabled ? styles.on : styles.off)}>
                        </div>
                    </label>
                </li>
                <li className={styles.Settings__List__Item}>
                    <h2 className={styles.Settings__List__Item__Title}>Software</h2>
                    
                    <a href="https://github.com/hueltzen/lekkr">
                        <LinkIcon />
                        Code on Github
                    </a>
                </li>
            </ol>

            <div>
                <input 
                    className={styles.hidden}
                    type="checkbox"
                    onChange={toggleDarkMode}
                    checked={props.isDarkModeEnabled} 
                    name="darkMode"
                    id="darkMode" />
            </div>
            
        </motion.div>
    )

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);