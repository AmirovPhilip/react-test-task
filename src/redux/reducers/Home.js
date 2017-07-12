import {
    SIDEBAR_VISIBILITY_TOGGLE,
} from '../actions/actionTypes'

const initialState = {
    sidebarVisibility: false,
};

export default function (state = initialState, action) {

    switch (action.type) {

        case SIDEBAR_VISIBILITY_TOGGLE:
            return { ...state, ...{
                sidebarVisibility: !state.sidebarVisibility
            }}
        default:
            return state

    }

}