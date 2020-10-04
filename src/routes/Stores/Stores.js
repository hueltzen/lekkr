import React, { Component } from 'react';

import styles from './Stores.module.scss';

import { v4 as uuidv4 } from 'uuid';

import PageHeadline from '../../components/PageHeadline/PageHeadline';
import StoreItem from '../../components/StoreItem/StoreItem';

import { ReactComponent as AddIcon } from './add.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as CheckIcon } from './check.svg';

class Stores extends Component {

    constructor(props) {
        super(props);

        this.refresh = this.refresh.bind(this);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.createStore = this.createStore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onPrimaryColorChange = this.onPrimaryColorChange.bind(this);
        
        this.state = ({
            storeName: '',
            primaryColor: 'white',

            show: false,

            stores: []
        });
    }

    componentDidMount() {

        this.refresh();

    }

    render() {

        const storesList = this.state.stores.map((store, i) =>
            <StoreItem 
                key={i}
                uuid={store.uuid}
                name={store.name}
                primaryColor={store.primaryColor}
                refresh={this.refresh}/>
        );

        return(
            <div className={styles.Stores}>
                <PageHeadline>
                    Your Stores
                </PageHeadline>

                <div>
                    { storesList.length > 0
                        ? storesList
                        : <p className={styles.Stores__EmptyMessage}>No Stores yet.</p>}
                </div>

                <button className={styles.Stores__Button} onClick={this.open}>
                    <AddIcon />
                </button>

                <div className={styles.Stores__CreateDialog + ' ' + (this.state.show ? styles.Stores__CreateDialog__open : '')}>
                    <button onClick={this.close} className={styles.Stores__CreateDialog__CloseButton}>
                        <CloseIcon />
                    </button>
                
                    <h2>
                        New Store
                    </h2>
                
                    <form onSubmit={this.createStore}>
                        <input 
                            type="text"
                            value={this.state.storeName}
                            onChange={this.handleChange}
                            name="storeName"
                            placeholder="List name" />

                        <div className={styles.Stores__CreateDialog__PrimaryColor}>
                            <h3>Primary Color</h3>
                            <ul>
                                <li className={styles.Stores__CreateDialog__PrimaryColor__White}>
                                    <input 
                                        type="radio" 
                                        id="primaryWhite" 
                                        name="primaryColor"
                                        value="white"
                                        checked={this.state.primaryColor === 'white'}
                                        onChange={this.onPrimaryColorChange}></input>
                                    <label htmlFor="primaryWhite"><CheckIcon /></label>
                                    </li>
                                <li className={styles.Stores__CreateDialog__PrimaryColor__Red}>
                                    <input 
                                        type="radio" 
                                        id="primaryRed" 
                                        name="primaryColor"
                                        value="red"
                                        checked={this.state.primaryColor === 'red'}
                                        onChange={this.onPrimaryColorChange}></input>
                                    <label htmlFor="primaryRed"><CheckIcon /></label>
                                </li>
                                <li className={styles.Stores__CreateDialog__PrimaryColor__Green}>
                                    <input 
                                        type="radio" 
                                        id="primaryGreen" 
                                        name="primaryColor"
                                        value="green"
                                        checked={this.state.primaryColor === 'green'}
                                        onChange={this.onPrimaryColorChange}></input>
                                    <label htmlFor="primaryGreen"><CheckIcon /></label>
                                </li>
                                <li className={styles.Stores__CreateDialog__PrimaryColor__Blue}>
                                    <input 
                                        type="radio" 
                                        id="primaryBlue" 
                                        name="primaryColor"
                                        value="blue"
                                        checked={this.state.primaryColor === 'blue'}
                                        onChange={this.onPrimaryColorChange}></input>
                                    <label htmlFor="primaryBlue"><CheckIcon /></label>
                                </li>
                                <li className={styles.Stores__CreateDialog__PrimaryColor__DarkBlue}>
                                    <input 
                                        type="radio" 
                                        id="primaryDarkBlue" 
                                        name="primaryColor"
                                        value="dark-blue"
                                        checked={this.state.primaryColor === 'dark-blue'}
                                        onChange={this.onPrimaryColorChange}></input>
                                    <label htmlFor="primaryDarkBlue"><CheckIcon /></label>
                                </li>
                                <li className={styles.Stores__CreateDialog__PrimaryColor__Orange}>
                                    <input 
                                        type="radio" 
                                        id="primaryOrange" 
                                        name="primaryColor"
                                        value="orange"
                                        checked={this.state.primaryColor === 'orange'}
                                        onChange={this.onPrimaryColorChange}></input>
                                    <label htmlFor="primaryOrange"><CheckIcon /></label>
                                </li>
                                <li className={styles.Stores__CreateDialog__PrimaryColor__Yellow}>
                                    <input 
                                        type="radio" 
                                        id="primaryYellow" 
                                        name="primaryColor"
                                        value="yellow"
                                        checked={this.state.primaryColor === 'yellow'}
                                        onChange={this.onPrimaryColorChange}></input>
                                    <label htmlFor="primaryYellow"><CheckIcon /></label>
                                </li>
                            </ul>
                        </div>

                        <button 
                            type="submit"
                            className={styles.Stores__CreateDialog__CreateButton}
                            disabled={this.state.storeName === ''}>
                            Create
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    refresh() {

        let loadedStores = JSON.parse(localStorage.getItem('stores'));

        if (!loadedStores) {
            loadedStores = [];
        }

        this.setState({
            storeName: '',
            primaryColor: 'white',
            secondaryColor: 'red',

            show: false,

            stores: loadedStores
        });

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
            ...this.state,
            storeName: e.target.value
        });

    }

    onPrimaryColorChange(e) {
        
        this.setState({
            ...this.state,
            primaryColor: e.target.value
        });

    }

    createStore(e) {
        e.preventDefault();

        if (this.state.storeName !== '' &&
            this.state.primaryColor !== '') {

            let loadedStores = JSON.parse(localStorage.getItem('stores'));
            
            if (!loadedStores) {
                loadedStores = [];
            }
    
            const matchingStores = loadedStores.filter(store => {
                return store.name === this.state.storeName;
            });
    
            if (matchingStores.length === 0) {
    
                loadedStores.push({
                    uuid: uuidv4(),
                    name: this.state.storeName,
                    primaryColor: this.state.primaryColor
                });
    
                localStorage.setItem('stores', JSON.stringify(loadedStores));

                this.refresh();

            }

            
        }

    }

}

export default Stores;