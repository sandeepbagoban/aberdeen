import configureStore from './configuration';

const initialState = {};
let store = null;

export default function getStore() {
    if(store === null) {
        const result = configureStore({initialState});
        store = result.store;
    }
    return {store}
}