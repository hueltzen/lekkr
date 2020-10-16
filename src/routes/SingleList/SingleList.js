import React, { useState } from 'react';
import styles from './SingleList.module.scss';

import { connect } from 'react-redux';
import { 
    addGrocery,
    setGrocery
} from '../../actions/ListActions';

import { motion, AnimatePresence } from  'framer-motion';
import PageTransition from '../PageTransitions';

import PageHeadline from '../../components/PageHeadline/PageHeadline';
import GroceryListItem from '../../components/GroceryListItem/GroceryListItem';

import { ReactComponent as AddIcon } from './add.svg';

const mapStateToProps = state => {
    return { lists: state.lists };
};

function mapDispatchToProps(dispatch) {
    return {
        addGrocery: item => dispatch(addGrocery(item)),
        setGrocery: item => dispatch(setGrocery(item))
    };
}
function SingleList(props) {

    const transition = {
        visible: {
            opacity: [0, 0, 0, 1],
            y: [48, 32, 16, 0]
        },
        hidden: {
            opacity: [0, 0, 0, 0],
            y: [0, 16, 32, 48]
        },
        transition: {
            duration: 1.2
        }
    }

    const { match: { params } } = props;
    const [ uuid, setUuid ] = useState(params.uuid);
    const [ groceryName, setGroceryName ] = useState('');

    function handleChange(e) {

        setGroceryName(e.target.value);

    }

    function addItem(e) {

        e.preventDefault();

        if (groceryName !== '' && groceryName.length < 41) {

            props.addGrocery({
                uuid: uuid,
                name: groceryName
            });

            setGroceryName('');

        }

    }

    const shoppingList = props.lists.filter(list => {
        return list.uuid === uuid
    })[0];

    const shoppingListItems = shoppingList.items.map((item, i) => 
        <GroceryListItem 
            key={i}
            listUuid={uuid}
            uuid={item.uuid}
            name={item.name}
            checked={item.checked}/>
    );

    return(
        <motion.div
            className={styles.SingleList}
            variants={PageTransition}
            initial="out"
            animate="in"
            exit="out"
            transition="transition">
            
            <PageHeadline>
                { shoppingList.name }
            </PageHeadline>

            <div className={styles.SingleList__GroceryList}>
                <form onSubmit={addItem}>
                    <input 
                        type="text"
                        value={groceryName}
                        onChange={handleChange}
                        name="groceryName"
                        placeholder="Add Item"
                        max-length="40" />

                    <button 
                        type="submit">
                        <AddIcon />
                    </button>
                </form>
                
                { shoppingListItems.length > 0 && 
                    <AnimatePresence>
                        <motion.div
                            variants={transition}
                            key="shoppingListItems"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={transition}>
                                {shoppingListItems}
                        </motion.div>
                    </AnimatePresence>}
                { shoppingListItems.length === 0 && 
                    <p className={styles.SingleList__EmptyMessage}>So quiet here... <span role="img" aria-label="quietness">🤭</span></p>}
            </div>
        </motion.div>
    );

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleList);