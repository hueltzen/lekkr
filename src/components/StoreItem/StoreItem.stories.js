import React from 'react';
import { storiesOf } from '@storybook/react';

import Provider from '../../stories/Provider';

import StoreItem from './StoreItem';

storiesOf('Components/StoreItem', module)
    .addDecorator(story => <Provider story={story()} />)
    .add('Default', () => (
        <StoreItem 
            key='0'
            uuid='3d9576af-1f28-430a-a578-1b901e23949b'
            name='Default Store 0'
            primaryColor='white'
        />
    ));