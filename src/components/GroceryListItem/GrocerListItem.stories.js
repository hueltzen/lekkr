import React from 'react';
import { storiesOf } from '@storybook/react';

import Provider from '../../stories/Provider';

import GroceryListItem from './GroceryListItem';

storiesOf('Components/GroceryListItem', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('Unchecked Item', () => (
        <GroceryListItem 
            key="0"
            listUuid="3d9576af-1f28-430a-a578-1b901e23949b"
            uuid="80073649-2127-416b-adc4-56f90514be83"
            name="Grocery 1"
            checked={false}
            store={{}}/>
    ))
    .add('Checked Item', () => (
        <GroceryListItem 
            key="0"
            listUuid="3d9576af-1f28-430a-a578-1b901e23949b"
            uuid="80073649-2127-416b-adc4-56f90514be83"
            name="Grocery 1"
            checked={true}
            store={{}}/>
    ))
    .args({
        name: 'Grocery 1'
    })