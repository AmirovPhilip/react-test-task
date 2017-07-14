import {
    CREATE_USER_REQUEST,
    CREATE_USER_OK,
    CREATE_USER_NO,
    CREATE_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_OK,
    LOGIN_USER_NO,
    LOGIN_USER_ERROR,
    RESET_REGISTER_FLAG,
    RESET_USER_ERROR,
    SESSION_USER_REQUEST,
    SESSION_USER_OK,
    SESSION_USER_NO,
    SESSION_USER_ERROR,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_OK,
    LOGOUT_USER_ERROR
} from '../actions/actionTypes'

const initialState = {
    session: false,
    name: '',
    email: '',
    registerRequest: false,
    error: ''
};

export default function (state = initialState, action) {

    switch (action.type) {

        case CREATE_USER_REQUEST:
            return { ...state }
        case CREATE_USER_OK:
            return { ...state, ...{
                registerRequest: true,
                error: ''
            }}
        case CREATE_USER_NO:
            return { ...state, ...{
                error: action.data
            }}
        case CREATE_USER_ERROR:
            return { ...state, ...{
                error: 'Server Error: Registration failed. Please try later...'
            }}
        case SESSION_USER_REQUEST:
            return { ...state }
        case SESSION_USER_OK:
            return { ...state, ...{
                session: true,
                name: action.data.username,
                email: action.data.email,
                error: ''
            }}
        case SESSION_USER_NO:
            return { ...state, ...{
                session: false,
                name: '',
                email: '',
                error: ''
            }}
        case SESSION_USER_ERROR:
            return { ...state, ...{
                error: 'Server Error: Server don`t work. Please try later...'
            }}
        case LOGIN_USER_REQUEST:
            return { ...state }
        case LOGIN_USER_OK:
            return { ...state, ...{
                session: true,
                name: action.data.username,
                email: action.data.email,
                registerRequest: true,
                error: '',
            }}
        case LOGIN_USER_NO:
            return { ...state, ...{
                error: action.data
            }}
        case LOGIN_USER_ERROR:
            return { ...state, ...{
                error: 'Server Error: Login failed. Please try later...'
            }}
        case RESET_REGISTER_FLAG:
            return { ...state, ...{
                registerRequest: false,
            }}
        case RESET_USER_ERROR:
            return { ...state, ...{
                error: ''
            }}
        case LOGOUT_USER_REQUEST:
            return { ...state, ...{
                error: ''
            }}
        case LOGOUT_USER_OK:
            return { ...state, ...{
                session: false,
                name: '',
                email: '',
                registerRequest: false,
                error: ''
            }}
        case LOGOUT_USER_ERROR:
            return { ...state, ...{
                error: 'Server Error: Server don`t work. Please try later...'
            }}
        default:
            return state

    }

}
