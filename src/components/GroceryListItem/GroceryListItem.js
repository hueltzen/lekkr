import React, { Component } from 'react';

import styles from './GroceryListItem.module.scss';

import { ReactComponent as CheckIcon } from './check.svg';
import { ReactComponent as DeleteIcon} from './close.svg';
import { ReactComponent as CloseIcon } from './close.svg';


class GroceryListItem extends Component {

    constructor(props) {
        super(props);

        this.toggleCheck = this.toggleCheck.bind(this);
        this.openConfigDialog = this.openConfigDialog.bind(this);
        this.closeConfigDialog = this.closeConfigDialog.bind(this);
        this.setStore = this.setStore.bind(this);
        this.removeStore = this.removeStore.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = ({
            name: this.props.name,
            checked: this.props.checked,
            store: (this.props.store ? this.props.store : {}),

            configDialogOpen: false,

            stores: []
        });

    }

    componentDidMount() {

        const stores = localStorage.getItem('stores');
        if (stores) {
            this.setState({
                ...this.state,
                stores: JSON.parse(stores)
            });
        }

    }

    render() {
        const stores = this.state.stores.map((store, i) => 
            <li key={i} className={styles.GroceryListItem__ConfigDialog__ChooseStore__StoreList__Item}>
                <button onClick={() => this.setStore(store.uuid)}>
                    <span className={'tag__' + store.primaryColor}></span>
                    { store.name }
                </button>
            </li>
        );

        const storeTags = {};
        this.state.stores.forEach(store => {
            storeTags[store.uuid] = store.primaryColor
        });
        console.log(storeTags);

        return(
            <div className={styles.GroceryListItem + ' ' + (this.state.checked ? styles.checked : '')}>
                <button onClick={this.toggleCheck} className={styles.GroceryListItem__Button + ' ' + (this.state.checked ? styles.checked : '')}>
                    <CheckIcon />
                </button>
            
                <div className={styles.GroceryListItem__Content} onClick={this.openConfigDialog} >
                    { this.state.store && this.state.store.uuid && 
                        <div className={ styles.GroceryListItem__Content__Name__Store + ' tag__' + storeTags[this.state.store.uuid]}></div>
                    }
                    { !this.state.store.uuid && 
                        <div className={ styles.GroceryListItem__Content__Name__Store + ' tag__none'}></div>
                    }
                    <h2 className={styles.GroceryListItem__Content__Name}>{ this.props.name }</h2>
                </div>
                
                <button 
                    className={styles.GroceryListItem__DeleteButton + ' ' + (this.state.checked ? styles.checked : '')}
                    onClick={this.deleteItem}
                    disabled={!this.state.checked}>
                    <DeleteIcon />
                </button>

                <div className={styles.GroceryListItem__ConfigDialog + ' ' + (this.state.configDialogOpen ? styles.open : '')}>
                    <button onClick={this.closeConfigDialog} className={styles.GroceryListItem__ConfigDialog__CloseButton}>
                        <CloseIcon />
                    </button>

                    <h2>
                        Set Store
                    </h2>

                    <ul className={styles.GroceryListItem__ConfigDialog__ChooseStore__StoreList}>
                        <li className={styles.GroceryListItem__ConfigDialog__ChooseStore__StoreList__Item}>
                            <button onClick={this.removeStore}>
                                <span></span>
                                No Store
                            </button>    
                        </li>
                        { stores }
                    </ul>
                </div>
            </div>
        )
    }

    toggleCheck() {

        const checked = !this.state.checked;
        
        this.setState({
            ...this.state,
            checked: checked
        });

        this.props.setItemChecked(this.props.uuid, checked);
        
    }

    openConfigDialog() {

        this.setState({
            name: this.props.name,
            checked: this.props.checked,
            configDialogOpen: true
        });

    }

    closeConfigDialog() {

        this.setState({
            name: this.props.name,
            checked: this.props.checked,
            configDialogOpen: false
        });

    }

    setStore(uuid) {

        const loadedStores = localStorage.getItem('stores')
        if (loadedStores) {

            const store = JSON.parse(loadedStores).filter(store => {
                return store.uuid === uuid
            });

            console.log(store);
            if(store) {
                
                this.setState({
                    ...this.state,
                    store: {
                        uuid: store[0].uuid,
                        name: store[0].name
                    }
                });

            }

            const loadedShoppingList = JSON.parse(localStorage.getItem(this.props.listUuid));
            loadedShoppingList.items = loadedShoppingList.items.map(item => {

                if (item.uuid === this.props.uuid) {
                    item.store = {
                        uuid: store[0].uuid,
                        name: store[0].name
                    }
                }

                return item;

            });

            localStorage.setItem(
                this.props.listUuid,
                JSON.stringify(loadedShoppingList)
            );

            this.closeConfigDialog();

        }

    }

    removeStore() {

        this.setState({
            ...this.state,
            store: {}
        });

        const loadedShoppingList = JSON.parse(localStorage.getItem(this.props.listUuid));
        loadedShoppingList.items = loadedShoppingList.items.map(item => {

            if (item.uuid === this.props.uuid) {
                item.store = {}
            }

            return item;

        });

        localStorage.setItem(
            this.props.listUuid,
            JSON.stringify(loadedShoppingList)
        );

        this.closeConfigDialog();

    }

    deleteItem() {

        this.props.deleteItem(this.props.uuid);
        this.closeConfigDialog();

    }

}

export default GroceryListItem;