import { combineReducers } from 'redux';

import home from './Home';
import map from './Map';

const rootReducer = combineReducers({
    home,
    map
});

export default rootReducer;