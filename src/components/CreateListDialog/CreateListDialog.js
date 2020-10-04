import React, { Component } from 'react';
import styles from './CreateListDialog.module.scss';

import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as CloseIcon } from './close.svg';

class CreateListDialog extends Component {

    constructor(props) {
        super(props);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createList = this.createList.bind(this);

        this.state = ({
            show: false,
            listName: ''
        });
    }

    render() {
        return(
            <div className={styles.CreateListDialog + ' ' + (this.state.show ? styles.CreateListDialog__open : '')}>
                <button onClick={this.close} className={styles.CreateListDialog__CloseButton}>
                    <CloseIcon />
                </button>

                <h2>
                    New Shopping List
                </h2>
            
                <form onSubmit={this.createList}>
                    <input 
                        type="text"
                        value={this.state.listName}
                        onChange={this.handleChange}
                        name="listName"
                        placeholder="List name" />

                    <button 
                        type="submit"
                        className={styles.CreateListDialog__CreateButton}
                        disabled={this.state.listName === ''}>
                        Create
                    </button>
                </form>
            </div>
        )
    }
    
    open() {
        this.setState({
            ...this.state,
            show: true
        });
    }

    close() {
        this.setState({
            ...this.state,
            show: false
        });
    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });

    }

    createList(e) {
        e.preventDefault();

        if (this.state.listName === '') {
            return;
        }

        const result = Object.keys(localStorage).filter(key => {

            const shoppingList = JSON.parse(localStorage.getItem(key));
    
            return shoppingList.name === this.state.listName;
    
        });

        console.log(result);
        if (result.length !== 0) {
            this.close();
            return;
        }

        localStorage.setItem(
            uuidv4(),
            JSON.stringify({
                'name': this.state.listName,
                'items': []
            })
        );

        this.setState({
            show: false,
            listName: ''
        });
        this.props.refreshList();

    }

}

export default CreateListDialog;