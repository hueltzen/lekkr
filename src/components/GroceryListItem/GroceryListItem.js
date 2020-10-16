import React, { useState } from 'react';
import styles from './GroceryListItem.module.scss';

import { connect } from 'react-redux';
import {
    setGrocery,
    deleteGrocery,
    setGroceryStore
} from '../../actions/ListActions';
import PropTypes from 'prop-types';

import { ReactComponent as DeleteIcon} from './close.svg';

const mapStateToProps = state => {
    return { stores: state.stores };
};

function mapDispatchToProps(dispatch) {
    return {
        setGrocery: item => dispatch(setGrocery(item)),
        deleteGrocery: item => dispatch(deleteGrocery(item)),
        setGroceryStore: item => dispatch(setGroceryStore(item))
    };
}

function GroceryListItem(props) {

    const [ name ] = useState(props.name);
    const [ checked, setChecked ] = useState(props.checked);

    function toggleCheck() {

        const newChecked = !checked;

        props.setGrocery({
            listUuid: props.listUuid,
            groceryUuid: props.uuid,
            checked: newChecked
        });

        setChecked(newChecked);
        
    }

    function deleteItem() {

        props.deleteGrocery({
            listUuid: props.listUuid,
            groceryUuid: props.uuid
        });

    }

    return (
        <div className={styles.GroceryListItem + ' ' + (checked ? styles.checked : '')}>
        
            <button 
                className={styles.GroceryListItem__Content} onClick={toggleCheck} >
                <h2 className={styles.GroceryListItem__Content__Name}>{ name }</h2>
            </button>
            
            <button 
                className={styles.GroceryListItem__DeleteButton + ' ' + (checked ? styles.checked : '')}
                onClick={deleteItem}
                disabled={!checked}>
                <DeleteIcon />
            </button>

        </div>
    );

}

GroceryListItem.propTypes = {

    /** Removes the GroceryListItem from the list */
    deleteItem: PropTypes.func,

};

const ConnectedGroceryListItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroceryListItem);

ConnectedGroceryListItem.propTypes = GroceryListItem.propTypes;

export default ConnectedGroceryListItem;