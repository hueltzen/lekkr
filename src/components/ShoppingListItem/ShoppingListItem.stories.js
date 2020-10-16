import React from 'react';
import { storiesOf } from '@storybook/react';

import Provider from '../../stories/Provider';

import ShoppingListItem from './ShoppingListItem';

storiesOf('Components/ShoppingListItem', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('Uncompleted Item', () => (
        <ShoppingListItem
            key={''}
            uuid={''}
            name={'Shopping List 0'}
            items={[]}/>
    ))
    .add('Partially Completed Item', () => (
        <ShoppingListItem
            key={''}
            uuid={''}
            name={'Shopping List 1'}
            items={[
                {
                    "uuid":"80073649-2127-416b-adc4-56f90514be83",
                    "name":"Grocery Item 1",
                    "checked":false,
                    "store": {}
                },
                {
                    "uuid":"29c2a711-c845-4cd3-9daa-a98c8e9073cd",
                    "name":"Grocery Item 2",
                    "checked":true,
                    "store": {}
                }
            ]}/>
    ))
    .add('Completed Item', () => (
        <ShoppingListItem
            key={''}
            uuid={''}
            name={'Shopping List 2'}
            items={[
                {
                    "uuid":"80073649-2127-416b-adc4-56f90514be83",
                    "name":"Grocery Item 1",
                    "checked":true,
                    "store": {}
                },
                {
                    "uuid":"29c2a711-c845-4cd3-9daa-a98c8e9073cd",
                    "name":"Grocery Item 2",
                    "checked":true,
                    "store": {}
                }
            ]}/>
    ));