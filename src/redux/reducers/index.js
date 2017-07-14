import { combineReducers } from 'redux';

import home from './Home';
import map from './Map';
import user from './User';

const rootReducer = combineReducers({
    home,
    map,
    user
});

export default rootReducer;