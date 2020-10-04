import React, { Component } from 'react';

import {
    Link
} from 'react-router-dom';

import styles from './ShoppingListItem.module.scss';

import { ReactComponent as DeleteIcon } from './delete.svg';

class ShoppingListItem extends Component {

    constructor(props) {
        super(props)

        this.openDeleteDialog = this.openDeleteDialog.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = ({
            deleteDialogOpen: false
        });

    }

    render() {
        return(
            <div className={styles.ShoppingListItem}>
                <div className={styles.ShoppingListItem__content}>
                    <Link to={`/list/${this.props.uuid}`}>
                        <h2 className={styles.ShoppingListItem__content__name}>{ this.props.name }</h2>
                        <div className={styles.ShoppingListItem__content__numberOfItems}>
                            { this.props.items.length } Products
                        </div>
                    </Link>
                </div>
                <button 
                    className={styles.ShoppingListItem__Button}
                    onClick={this.openDeleteDialog}>
                    <DeleteIcon />
                </button>

                <div className={styles.ShoppingListItem__DeleteDialog + ' ' + (this.state.deleteDialogOpen ? styles.open : '')}>
                    <p className={styles.ShoppingListItem__DeleteDialog__Text}>
                        Are you sure you want to delete "{ this.props.name }"?
                    </p>
                    <div className={styles.ShoppingListItem__DeleteDialog__Actions}>
                        <button
                            className={styles.ShoppingListItem__DeleteDialog__Actions__Cancel}
                            onClick={this.closeDeleteDialog}>
                            Cancel
                        </button>
                        <button
                            className={styles.ShoppingListItem__DeleteDialog__Actions__Confirm}
                            onClick={this.deleteItem}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    openDeleteDialog() {

        this.setState({
            deleteDialogOpen: true
        });

    }

    closeDeleteDialog() {

        this.setState({
            deleteDialogOpen: false
        });

    }

    deleteItem() {

        localStorage.removeItem(this.props.uuid);

        this.props.refreshList();

    }

}

export default ShoppingListItem;