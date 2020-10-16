import React from 'react';
import styles from './Home.module.scss';

import { connect } from 'react-redux';
import { setCreateDialog } from '../../actions/ListActions';

import {
    motion,
    AnimatePresence
} from  'framer-motion';
import PageTransition from '../PageTransitions';

import PageHeadline from '../../components/PageHeadline/PageHeadline';
import ShoppingListItem from '../../components/ShoppingListItem/ShoppingListItem';
import CreateListDialog from '../../components/CreateListDialog/CreateListDialog';

import { ReactComponent as AddIcon } from './add.svg';

const mapStateToProps = state => {
    return { 
        lists: state.lists,
        isCreateDialogOpen: state.isCreateDialogOpen
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setCreateDialog: open => dispatch(setCreateDialog(open))
    };
}

function Home(props) {

    function openCreateDialog() {

        props.setCreateDialog({
            open: true
        });

    }

    const shoppingListItems = props.lists.map((shoppingList, i) => 
        <ShoppingListItem 
            key={shoppingList.uuid}
            uuid={shoppingList.uuid}
            name={shoppingList.name}
            items={shoppingList.items}/>
    );

    return (
        <div>
            <motion.div
                className={styles.Home}
                variants={PageTransition}
                initial="out"
                animate="in"
                exit="out"
                transition="transition">

                <PageHeadline>
                    Your<br /> Shopping Lists

                    </PageHeadline>
                    
                <div>
                    { shoppingListItems.length > 0 
                        ? shoppingListItems
                        : <p className={styles.Home__EmptyMessage}>Let's get to work! <span role="img" aria-label="work">💪</span></p>
                    }
                </div>
            
                <button className={styles.Home__Button} onClick={openCreateDialog}>
                    <AddIcon /> New
                </button>

            </motion.div>

            <AnimatePresence>
                { props.isCreateDialogOpen &&
                    <CreateListDialog />}
            </AnimatePresence>

        </div>
    );

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);