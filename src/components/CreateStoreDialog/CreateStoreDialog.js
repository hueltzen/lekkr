import React, { useState } from 'react';
import styles from './CreateStoreDialog.module.scss';

import { connect } from 'react-redux';
import {
    createStore,
    setCreateStoreDialog
} from '../../actions/ListActions';

import { motion } from 'framer-motion';

import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as CheckIcon } from './check.svg';

const mapStateToProps = state => {
    return { isOpen: state.isCreateStoreDialogOpen }
};

const mapDispatchToProps = dispatch => {
    return {
        createStore: store => dispatch(createStore(store)),
        setCreateStoreDialog: open => dispatch(setCreateStoreDialog(open))
    }
};

function CreateStoreDialog(props) {

    const [ storeName, setStoreName ] = useState('');
    const [ primaryColor, setPrimaryColor ] = useState('white');

    const fadeTransition = {
        visible: {
            opacity: 1
        },
        hidden: {
            opacity: 0
        },
        transition: {
            duration: 0.4,
        }
    };

    const transition = {
        visible: {
            scale: 1,
            y: 0
        },
        hidden: {
            scale: 0,
            y: 0
        },
        transition: {
            duration: 0.4,

        }
    };

    function createStore(e) {

        e.preventDefault();

        if (storeName !== '' && primaryColor !== '') {

            props.createStore({
                name: storeName,
                primaryColor: primaryColor
            });

            close();
        
        }

    }

    function close() {

        props.setCreateStoreDialog({
            open: false
        });

    }

    function handleChange(e) {

        setStoreName(e.target.value);

    }

    function onPrimaryColorChange(e) {

        setPrimaryColor(e.target.value);

    }

    return (
        <motion.div className={styles.Fade}
            key="fade"
            variants={fadeTransition}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition="transiton">
            <motion.div 
                className={styles.CreateDialog}
                key="modal"
                variants={transition}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition="transiton">
    
                <button onClick={close} className={styles.CreateDialog__CloseButton}>
                    <CloseIcon />
                </button>
            
                
                <form onSubmit={createStore}>
                    <div className={styles.CreateDialog__Content}>
                        <h2>
                            New Store
                        </h2>
                        <input 
                            type="text"
                            value={storeName}
                            onChange={handleChange}
                            name="storeName"
                            placeholder="List name" />
    
                        <div className={styles.CreateDialog__PrimaryColor}>
                            <ul>
                                <li className={styles.CreateDialog__PrimaryColor__White}>
                                    <input 
                                        type="radio" 
                                        id="primaryWhite" 
                                        name="primaryColor"
                                        value="white"
                                        checked={primaryColor === 'white'}
                                        onChange={onPrimaryColorChange}></input>
                                    <label htmlFor="primaryWhite"><CheckIcon /></label>
                                    </li>
                                <li className={styles.CreateDialog__PrimaryColor__Red}>
                                    <input 
                                        type="radio" 
                                        id="primaryRed" 
                                        name="primaryColor"
                                        value="red"
                                        checked={primaryColor === 'red'}
                                        onChange={onPrimaryColorChange}></input>
                                    <label htmlFor="primaryRed"><CheckIcon /></label>
                                </li>
                                <li className={styles.CreateDialog__PrimaryColor__Green}>
                                    <input 
                                        type="radio" 
                                        id="primaryGreen" 
                                        name="primaryColor"
                                        value="green"
                                        checked={primaryColor === 'green'}
                                        onChange={onPrimaryColorChange}></input>
                                    <label htmlFor="primaryGreen"><CheckIcon /></label>
                                </li>
                                <li className={styles.CreateDialog__PrimaryColor__Blue}>
                                    <input 
                                        type="radio" 
                                        id="primaryBlue" 
                                        name="primaryColor"
                                        value="blue"
                                        checked={primaryColor === 'blue'}
                                        onChange={onPrimaryColorChange}></input>
                                    <label htmlFor="primaryBlue"><CheckIcon /></label>
                                </li>
                                <li className={styles.CreateDialog__PrimaryColor__DarkBlue}>
                                    <input 
                                        type="radio" 
                                        id="primaryDarkBlue" 
                                        name="primaryColor"
                                        value="dark-blue"
                                        checked={primaryColor === 'dark-blue'}
                                        onChange={onPrimaryColorChange}></input>
                                    <label htmlFor="primaryDarkBlue"><CheckIcon /></label>
                                </li>
                                <li className={styles.CreateDialog__PrimaryColor__Orange}>
                                    <input 
                                        type="radio" 
                                        id="primaryOrange" 
                                        name="primaryColor"
                                        value="orange"
                                        checked={primaryColor === 'orange'}
                                        onChange={onPrimaryColorChange}></input>
                                    <label htmlFor="primaryOrange"><CheckIcon /></label>
                                </li>
                                <li className={styles.CreateDialog__PrimaryColor__Yellow}>
                                    <input 
                                        type="radio" 
                                        id="primaryYellow" 
                                        name="primaryColor"
                                        value="yellow"
                                        checked={primaryColor === 'yellow'}
                                        onChange={onPrimaryColorChange}></input>
                                    <label htmlFor="primaryYellow"><CheckIcon /></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className={styles.CreateDialog__CreateButton}
                        disabled={storeName === ''}>
                        Create
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateStoreDialog);