import React, { useState } from 'react';
import styles from './CreateListDialog.module.scss';

import { connect } from 'react-redux';
import { createList, setCreateDialog } from '../../actions/ListActions';
import { motion } from 'framer-motion';

import { ReactComponent as CloseIcon } from './close.svg';

const mapStateToProps = state => {
    return { isOpen: state.isCreateDialogOpen }
}

function mapDispatchToProps(dispatch) {
    return {
        createList: list => dispatch(createList(list)),
        setCreateDialog: open => dispatch(setCreateDialog(open))
    };
}

function CreateListDialog(props) {

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
    }

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
    }

    const [ listName, setListName ] = useState('');

    function close() {
        
        props.setCreateDialog({
            open: false
        });

    }

    function handleChange(e) {

        setListName(e.target.value);

    }

    function createList(e) {
        e.preventDefault();

        if (listName === '') {
            return;
        }

        props.createList({
            name: listName
        });

        setListName('');

        close();

    }

    return(
        <motion.div className={styles.Fade}
            key="fade"
            variants={fadeTransition}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition="transiton">
            <motion.div 
                className={styles.CreateListDialog}
                key="modal"
                variants={transition}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition="transiton">
                <div>
                    <button onClick={close} className={styles.CreateListDialog__CloseButton}>
                        <CloseIcon />
                    </button>

                    <form onSubmit={createList}>
                        <div className={styles.CreateListDialog__Content}>
                            <h2>
                                New Shopping List
                            </h2>
                            <input 
                                type="text"
                                value={listName}
                                onChange={handleChange}
                                name="listName"
                                placeholder="List name" />
                        </div>

                        <button 
                            type="submit"
                            className={styles.CreateListDialog__CreateButton}
                            disabled={listName === ''}>
                            Create
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    )

}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(CreateListDialog);