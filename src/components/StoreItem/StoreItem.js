import React, { Component } from 'react';

import styles from './StoreItem.module.scss';

import { ReactComponent as DeleteIcon} from './close.svg';

class StoreItem extends Component {

    constructor(props) {
        super(props);

        this.deleteStore = this.deleteStore.bind(this);
    }

    render() {
        return(
            <div className={styles.StoreItem}>
                <div className={styles.StoreItem__ColorTags}>
                    <div className={'tag tag__' + this.props.primaryColor}></div>
                </div>
                <div className={styles.StoreItem__Name}>
                    { this.props.name }
                </div>

                <button 
                    className={styles.StoreItem__DeleteButton}
                    onClick={this.deleteStore}>
                    <DeleteIcon />
                </button>
            </div>
        )
    }

    deleteStore() {

        const loadedStores = localStorage.getItem('stores');

        if(loadedStores) {

            console.log('delete store ' + this.props.uuid);

            let stores = JSON.parse(loadedStores);
            stores = stores.filter(store => store.uuid !== this.props.uuid);

            localStorage.setItem(
                'stores',
                JSON.stringify(stores)
            );

            let listsKeys = Object.entries(localStorage).filter(key => key[0] !== 'stores');
            listsKeys.forEach(element => {

                const key = element[0];
                const value = JSON.parse(element[1]);
                value.items = value.items.map(item => {

                    if (item.store && item.store.uuid && item.store.uuid === this.props.uuid) {
                        console.log(item.name);
                        item.store = {}
                    }

                    return item;

                });

                localStorage.setItem(
                    key,
                    JSON.stringify(value)
                );

            });

        }

        this.props.refresh();

    }

}

export default StoreItem;