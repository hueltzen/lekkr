import { v4 as uuidv4 } from 'uuid';

import {
    CREATE_LIST,
    DELETE_LIST,

    ADD_GROCERY,
    DELETE_GROCERY,
    SET_GROCERY,

    CREATE_STORE,
    DELETE_STORE,

    SET_CREATE_DIALOG,
    SET_CREATE_STORE_DIALOG,
    SET_GROCERY_STORE,

    SET_DARK_MODE
} from '../constants/actionTypes';

function getListsFromStorage() {

    const loadedLists = []
    Object.keys(localStorage).forEach(key => {

        if (key === 'stores' || key === 'settings') {
            return;
        }

        const list = JSON.parse(localStorage.getItem(key));

        loadedLists.push({
            'uuid': key,
            'name': list.name,
            'items': list.items
        });

    });

    return loadedLists;

}

function getStoresFromStorage() {

    return JSON.parse(localStorage.getItem('stores'));

}

function getSettingsFromStorage() {

    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
        return JSON.parse(storedSettings);
    }

    return {
        darkmode: false
    };

}

const stores = getStoresFromStorage();
const lists = getListsFromStorage();
const settings = getSettingsFromStorage();
const initialState = {
    stores: stores ? stores : [],
    lists: lists ? lists : [],

    isCreateDialogOpen: false,
    isCreateStoreDialogOpen: false,

    isDarkModeEnabled: settings.darkmode
};

function rootReducer(state = initialState, action) {
    
    if (action.type === CREATE_LIST) {

        const newList = {
            uuid: uuidv4(),
            name: action.payload.name,
            items: []
        };

        localStorage.setItem(
            newList.uuid,
            JSON.stringify({
                name: newList.name,
                items : []
            })
        );

        return Object.assign({}, state, {
            lists: state.lists.concat(newList)
        });
    }

    if (action.type === DELETE_LIST) {

        const filteredLists = state.lists.filter(list => {
            return list.uuid !== action.payload.uuid
        });

        localStorage.removeItem(action.payload.uuid);

        return Object.assign({}, state, {
            lists: filteredLists
        });


    }

    if (action.type === ADD_GROCERY) {

        console.log('add grocery');

        const loadedList = state.lists.filter(list => {
            return list.uuid === action.payload.uuid
        })[0];

        console.log(loadedList);

        loadedList.items.push({
            uuid: uuidv4(),
            name: action.payload.name,
            checked: false,
            store: {}
        });

        localStorage.setItem(
            action.payload.uuid,
            JSON.stringify(loadedList)
        );

        return Object.assign({}, state, {
            lists: getListsFromStorage()
        });

    }

    if (action.type === SET_GROCERY) {

        const loadedList = state.lists.filter(list => {
            return list.uuid === action.payload.listUuid
        })[0];

        loadedList.items = loadedList.items.map(item => {

            if (item.uuid === action.payload.groceryUuid) {
                item.checked = action.payload.checked;
            }

            return item;

        });

        localStorage.setItem(
            action.payload.listUuid,
            JSON.stringify(loadedList)
        );

        return Object.assign({}, state, {
            lists: getListsFromStorage()
        });

    }

    if (action.type === DELETE_GROCERY) {

        const loadedList = state.lists.filter(list => {
            return list.uuid === action.payload.listUuid
        })[0];

        loadedList.items = loadedList.items.filter(item => {
            return item.uuid !== action.payload.groceryUuid;
        });

        localStorage.setItem(
            action.payload.listUuid,
            JSON.stringify(loadedList)
        );

        return Object.assign({}, state, {
            lists: getListsFromStorage()
        });

    }

    if (action.type === SET_GROCERY_STORE) {

        const loadedList = state.lists.filter(list => {
            return list.uuid === action.payload.listUuid
        })[0];

        const loadedStore = state.stores.filter(store => {
            return store.uuid === action.payload.storeUuid
        })[0];

        loadedList.items = loadedList.items.map(item => {
            if (item.uuid === action.payload.groceryUuid) {
                item.store = {
                    uuid: loadedStore.uuid,
                    name: loadedStore.name
                };
            };
            return item;
        });

        localStorage.setItem(
            action.payload.listUuid,
            JSON.stringify(loadedList)
        );

        return Object.assign({}, state, {
            lists: getListsFromStorage()
        });

    }

    if (action.type === CREATE_STORE) {

        const newStore = {
            uuid: uuidv4(),
            name: action.payload.name,
            primaryColor: action.payload.primaryColor
        };

        const loadedStores = Object.assign({}, state).stores;
        loadedStores.push(newStore);

        localStorage.setItem(
            'stores',
            JSON.stringify(loadedStores)
        );

        return Object.assign({}, state, {
            stores: getStoresFromStorage()
        });

    }

    if (action.type === DELETE_STORE) {

        let loadedStores = state.stores;
        loadedStores = loadedStores.filter(store => {
            return store.uuid !== action.payload.uuid
        });

        localStorage.setItem(
            'stores',
            JSON.stringify(loadedStores)
        );
        
        const listsKeys = Object.entries(localStorage).filter(key => key[0] !== 'stores');
        listsKeys.forEach(element => {

            const key = element[0];
            const value = JSON.parse(element[1]);
            if (value.items === undefined || value.items.length <= 0) {
                return;
            }

            value.items = value.items.map(item => {

                if (item.store && item.store.uuid && item.store.uuid === action.payload.uuid) {
                    item.store = {}
                }

                return item;

            });

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

        });

        return Object.assign({}, state, {
            stores: getStoresFromStorage(),
            lists: getListsFromStorage()
        });

    }

    if (action.type === SET_CREATE_DIALOG) {

        return Object.assign({}, state, {
            isCreateDialogOpen: action.payload.open
        });

    }

    if (action.type === SET_CREATE_STORE_DIALOG) {

        return Object.assign({}, state, {
            isCreateStoreDialogOpen: action.payload.open
        });

    }

    if (action.type === SET_DARK_MODE) {

        let settings = getSettingsFromStorage();

        settings = {
            ...settings,
            darkmode: action.payload.enabled
        };

        localStorage.setItem(
            'settings',
            JSON.stringify(settings)
        );

        return Object.assign({}, state, {
            isDarkModeEnabled: settings.darkmode
        });

    }

    return state;

}

export default rootReducer;