import React from 'react';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import rootReducer from '../reducers/rootReducer';

//import store from '../store/store';

const store = createStore(rootReducer, {
    lists: [
        {
            "uuid": "3d9576af-1f28-430a-a578-1b901e23949b",
            "name": "Super Bowl Party",
            "items": [
                {
                    "uuid":"80073649-2127-416b-adc4-56f90514be83",
                    "name":"Chips",
                    "checked":false,
                    "store": {}
                },
                {
                    "uuid":"29c2a711-c845-4cd3-9daa-a98c8e9073cd",
                    "name":"Tacos",
                    "checked":false,
                    "store":{}
                }
            ]
        }
    ]
});

export default function Provider({ story }) {
    return (
        <ReduxProvider store={store}>
            <Router>
                {story}
            </Router>
        </ReduxProvider>
    );
};