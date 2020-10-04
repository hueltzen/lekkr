import React, { Component, createRef } from 'react';
import styles from './Home.module.scss';

import PageHeadline from '../../components/PageHeadline/PageHeadline';
import ShoppingListItem from '../../components/ShoppingListItem/ShoppingListItem';
import CreateListDialog from '../../components/CreateListDialog/CreateListDialog';

import { ReactComponent as AddIcon } from './add.svg';

class Home extends Component {

    constructor(props) {
        super(props);
        
        this.openAddDialog = this.openAddDialog.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.addDialog = createRef();

        this.state = ({
            shoppingListItems: []
        });

    }

    componentDidMount() {

        this.refreshList();

    }

    render() {

        const shoppingListItems = this.state.shoppingListItems.map((shoppingList, i) => 
                <ShoppingListItem 
                    key={shoppingList.id}
                    uuid={shoppingList.id}
                    name={shoppingList.name}
                    items={shoppingList.items}
                    refreshList={this.refreshList}/>
            );

        return (
            <div className={styles.Home}>
                <PageHeadline>
                    Your Lists
                </PageHeadline>

                <button className={styles.Home__Button} onClick={this.openAddDialog}>
                    <AddIcon />
                </button>

                <CreateListDialog 
                    ref={this.addDialog}
                    refreshList={this.refreshList} />

                <div>
                    { shoppingListItems.length > 0 
                        ? shoppingListItems
                        : <p className={styles.Home__EmptyMessage}>No Lists yet</p>
                    }
                </div>
            </div>
        );
    }

    openAddDialog() {
        this.addDialog.current.open();
    }

    refreshList() {

        this.setState({ shoppingListItems: [] });
        Object.keys(localStorage).forEach(key => {

            if (key === 'stores') {
                return;
            }

            const shoppingList = JSON.parse(localStorage.getItem(key));

            this.setState(state => {
                
                const shoppingListItems = state.shoppingListItems.concat(
                    {
                        'id': key,
                        'name': shoppingList.name,
                        'items': shoppingList.items
                    }
                );

                return {
                    shoppingListItems
                }
            });

        });

    }

}

export default Home;