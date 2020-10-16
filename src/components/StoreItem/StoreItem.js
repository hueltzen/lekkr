import React from 'react';
import styles from './StoreItem.module.scss';

import { connect } from 'react-redux';
import { deleteStore } from '../../actions/ListActions';

import { motion } from 'framer-motion';

import PropTypes from 'prop-types';

import { ReactComponent as DeleteIcon} from './close.svg';

function mapDispatchToProps(dispatch) {
    return {
        deleteStore: store => dispatch(deleteStore(store))
    };
}

function StoreItem(props) {

    const transition = {
        visible: {
            opacity: [0, 0, 0, 1],
            y: [48, 32, 16, 0]
        },
        hidden: {
            opacity: [0, 0, 0, 0],
            y: [0, 16, 32, 48]
        },
        transition: {
            duration: 0.4
        }
    };

    function deleteStore() {

        props.deleteStore({
            uuid: props.uuid
        });

    }

    return(
        <motion.div 
            className={styles.StoreItem}
            variants={transition}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition.transition}>
            <div className={styles.StoreItem__Name}>
                { props.name }
            </div>

            <button 
                className={styles.StoreItem__DeleteButton}
                onClick={deleteStore}>
                <DeleteIcon />
            </button>
        </motion.div>
    )

}

StoreItem.propTypes = {
    /** UUID of the store in localStorage */
    uuid: PropTypes.string.isRequired,
    /** Name to be displayed to the user */
    name: PropTypes.string.isRequired,
    /** PrimaryColor of the store */
    primaryColor: PropTypes.string.isRequired

}

export default connect(
    null,
    mapDispatchToProps
)(StoreItem);