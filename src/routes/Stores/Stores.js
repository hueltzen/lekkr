import React from 'react';

import styles from './Stores.module.scss';

import { connect } from 'react-redux';
import { 
    createStore,
    setCreateStoreDialog
} from '../../actions/ListActions';

import {
    motion,
    AnimatePresence
} from  'framer-motion';
import PageTransition from '../PageTransitions';

import PageHeadline from '../../components/PageHeadline/PageHeadline';
import StoreItem from '../../components/StoreItem/StoreItem';

import { ReactComponent as AddIcon } from './add.svg';
import CreateStoreDialog from '../../components/CreateStoreDialog/CreateStoreDialog';

const mapStateToProps = state => {
    return { 
        stores: state.stores,
        
        isOpen: state.isCreateStoreDialogOpen
    };
};

function mapDispatchToProps(dispatch) {
    return {
        createStore: store => dispatch(createStore(store)),
        
        setCreateStoreDialog: open => dispatch(setCreateStoreDialog(open))
    };
}

function Stores(props) {

    function open() {
        
        props.setCreateStoreDialog({
            open: true
        });

    }

    return (

        <div>
            <motion.div 
                className={styles.Stores}
                variants={PageTransition}
                initial="out"
                animate="in"
                exit="out"
                transition="transition">

                <PageHeadline>
                    Your<br /> Stores
                </PageHeadline>

                <div className={styles.Stores__List}>
                    { props.stores.length > 0 &&
                        <AnimatePresence>
                            {
                                props.stores.map((store, i) =>
                                    <StoreItem 
                                        key={i}
                                        uuid={store.uuid}
                                        name={store.name}
                                        primaryColor={store.primaryColor}/>
                                )
                            }
                        </AnimatePresence>}
                    { props.stores.length === 0 &&
                        <p className={ styles.Stores__EmptyMessage }>Nothing to see here <span role="img" aria-label="see-no-lists">🙈</span></p>}
                </div>
                <button className={styles.Stores__Button} onClick={open}>
                    <AddIcon /> New
                </button>
            </motion.div>

            { props.isOpen &&
                <CreateStoreDialog />}
        </div>
        
    );

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stores);