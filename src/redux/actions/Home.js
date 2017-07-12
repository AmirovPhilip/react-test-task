import {
    SIDEBAR_VISIBILITY_TOGGLE,
} from './actionTypes'

export function sidebarToggle(){
    return dispatch => {
        dispatch({
            type: SIDEBAR_VISIBILITY_TOGGLE
        });
    }
}