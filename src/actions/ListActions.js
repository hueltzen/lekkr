import {
    CREATE_LIST,
    DELETE_LIST,

    ADD_GROCERY,
    DELETE_GROCERY,
    SET_GROCERY,
    SET_GROCERY_STORE,

    CREATE_STORE,
    DELETE_STORE,

    SET_CREATE_DIALOG,
    SET_CREATE_STORE_DIALOG,

    SET_DARK_MODE
} from '../constants/actionTypes';

/**
 * Shopping List Actions
 */
export function createList(payload) {
    return { type: CREATE_LIST, payload }
};
export function deleteList(payload) {
    return { type: DELETE_LIST, payload }
};

/**
 * Grocery Item Actions 
 */
export function addGrocery(payload) {
    return { type: ADD_GROCERY, payload }
};
export function deleteGrocery(payload) {
    return { type: DELETE_GROCERY, payload }
};
export function setGrocery(payload) {
    return { type: SET_GROCERY, payload }
};
export function setGroceryStore(payload) {
    return { type: SET_GROCERY_STORE, payload };
};

/**
 * Store Actions
 */
export function createStore(payload) {
    return { type: CREATE_STORE, payload };
};
export function deleteStore(payload) {
    return { type: DELETE_STORE, payload };
};

/**
 * Other Actions
 */
export function setCreateDialog(payload) {
    return { type: SET_CREATE_DIALOG, payload }
};
export function setCreateStoreDialog(payload) {
    return { type: SET_CREATE_STORE_DIALOG, payload }
}

/**
 * Settings Actions
 */
export function setDarkMode(payload) {
    return { type: SET_DARK_MODE, payload }
}