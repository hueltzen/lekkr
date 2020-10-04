import React, { Component } from 'react';
import styles from './SingleList.module.scss';

import { v4 as uuidv4 } from 'uuid';

import PageHeadline from '../../components/PageHeadline/PageHeadline';
import GroceryListItem from '../../components/GroceryListItem/GroceryListItem';

import { ReactComponent as AddIcon } from './add.svg';

class SingleList extends Component {

    constructor(props) {
        super(props);

        this.refresh = this.refresh.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.setItemChecked = this.setItemChecked.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.setFocusOnAdd = this.setFocusOnAdd.bind(this);

        this.state = ({
            uuid: '',
            name: '',
            items: [],

            groceryName: ''
        })

    }

    componentDidMount() {

        this.refresh();

    }

    render() {
        const shoppingListItems = this.state.items.map((item, i) => 
            <GroceryListItem 
                key={i}
                listUuid={this.state.uuid}
                uuid={item.uuid}
                name={item.name}
                checked={item.checked}
                setItemChecked={this.setItemChecked}
                deleteItem={this.deleteItem}
                store={item.store}/>
        );

        return(
            <div className={styles.SingleList}>
                <PageHeadline>
                    { this.state.name }
                </PageHeadline>

                <div className={styles.SingleList__GroceryList}>
                    <form onSubmit={this.addItem}>
                        <input 
                            type="text"
                            value={this.state.groceryName}
                            onChange={this.handleChange}
                            ref={(input) => { this.addInput = input; }} 
                            name="groceryName"
                            placeholder="Add Item"
                            max-length="40" />

                        <button 
                            type="submit">
                            <AddIcon />
                        </button>
                    </form>
                    
                    <div>
                        { shoppingListItems.length > 0
                            ? shoppingListItems
                            : <p className={styles.SingleList__GroceryList__EmptyMessage}>No Items yet.</p>}
                    </div>
                </div>

                <button className={styles.SingleList__Button} onClick={this.setFocusOnAdd}>
                    <AddIcon />
                </button>
            </div>
        )
    }

    refresh() {

        const { match: { params } } = this.props;
        const shoppingList = JSON.parse(localStorage.getItem(params.uuid))

        this.setState({
            uuid: params.uuid,
            name: shoppingList.name,
            items: shoppingList.items,
            
            groceryName: ''
        });

    }

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });

    }

    setFocusOnAdd() {

        this.addInput.focus();

    }

    addItem(e) {

        console.log('addItem');
        e.preventDefault();

        console.log(this.state.groceryName.length);

        if (this.state.groceryName !== '' &&
            this.state.groceryName.length < 41) {

            const loadedShoppingList = JSON.parse(localStorage.getItem(this.state.uuid));
            const groceryName = this.state.groceryName;

            this.setState({
                ...this.state,
                groceryName: ''
            });
    
            loadedShoppingList.items.push({
                uuid: uuidv4(),
                name: groceryName,
                checked: false
            });
    
            localStorage.setItem(
                this.state.uuid,
                JSON.stringify(loadedShoppingList)
            );
    
            this.refresh();

        }


    }

    setItemChecked(uuid, checked) {

        const loadedShoppingList = JSON.parse(localStorage.getItem(this.state.uuid));

        loadedShoppingList.items = loadedShoppingList.items.map(listItem => {

            if (listItem.uuid === uuid) {
                listItem.checked = checked;
            }
            
            return listItem;

        });

        localStorage.setItem(
            this.state.uuid,
            JSON.stringify(loadedShoppingList)
        );

        this.refresh();

    }

    deleteItem(uuid) {

        const loadedShoppingList = JSON.parse(localStorage.getItem(this.state.uuid));

        loadedShoppingList.items = loadedShoppingList.items.filter(listItem => {
            
            return listItem.uuid !== uuid;

        });

        localStorage.setItem(
            this.state.uuid,
            JSON.stringify(loadedShoppingList)
        );

        this.refresh();

    }

}

export default SingleList;