import { createStore, combineReducers } from 'redux'
import projectReducer from '../reducers/projectsReducer'
import filtersReducer from '../reducers/filtersReducer'

export default () => {
    const store = createStore(combineReducers({
        projects: projectReducer,
        filters: filtersReducer
    })
    );
    
    return store;
};