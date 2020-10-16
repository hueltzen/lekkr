import React from 'react';
import styles from './ShoppingListItem.module.scss';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { connect } from 'react-redux';
import { deleteList } from '../../actions/ListActions';

import { ReactComponent as DeleteIcon } from './delete.svg';
import { ReactComponent as CheckIcon } from './check.svg';

function mapDispatchToProps(dispatch) {
    return {
        deleteList: listUuid => dispatch(deleteList(listUuid))
    };
}
function ShoppingListItem(props) {

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
    }

    function deleteItem() {

        props.deleteList({
            uuid: props.uuid
        });

    }

    const itemsChecked = props.items.filter(item => {
        return item.checked
    });

    return(
        <motion.div 
            className={styles.ShoppingListItem}
            variants={transition}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition.transition}>
            <div className={styles.ShoppingListItem__content}>
                <Link to={`/list/${props.uuid}`}>
                    <h2 className={styles.ShoppingListItem__content__name}>{ props.name }</h2>
                    <div className={styles.ShoppingListItem__content__numberOfItems}>
                        <CheckIcon /> {itemsChecked.length} / { props.items.length }
                    </div>
                </Link>
            </div>

            <button 
                className={styles.ShoppingListItem__Button}
                onClick={deleteItem}>
                <DeleteIcon />
            </button>

        </motion.div>
    )

}

export default connect(
    null,
    mapDispatchToProps
)(ShoppingListItem);