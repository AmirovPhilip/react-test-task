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
} from './actionTypes'
import axios from 'axios';

export function createUser(data) {
    return dispatch => {
        dispatch({
            type: CREATE_USER_REQUEST
        });
        axios.post('/createuser', data)
            .then(function (response) {
                if(response.data.error) {
                    dispatch({
                        type: CREATE_USER_NO,
                        data: response.data.error
                    });
                } else {
                    dispatch({
                        type: CREATE_USER_OK,
                    });
                }
            })
            .catch(function (error) {
                dispatch({
                    type: CREATE_USER_ERROR,
                    data: error.message
                });
            });
    }
}

export function getSessionUser() {
    return dispatch => {
        dispatch({
            type: SESSION_USER_REQUEST
        });
        axios.get('/session')
            .then(function (response) {
                if(response.data.error) {
                    dispatch({
                        type: SESSION_USER_NO,
                    });
                } else {
                    dispatch({
                        type: SESSION_USER_OK,
                        data: response.data
                    });
                }
            })
            .catch(function (error) {
                dispatch({
                    type: SESSION_USER_ERROR,
                    data: error.message
                });
            });
    }
}

export function loginUser(data) {
    return dispatch => {
        dispatch({
            type: LOGIN_USER_REQUEST
        });
        axios.post('/login', data)
            .then(function (response) {
                if(response.data.error) {
                    dispatch({
                        type: LOGIN_USER_NO,
                        data: response.data.error
                    });
                } else {
                    dispatch({
                        type: LOGIN_USER_OK,
                        data: response.data
                    });
                }
            })
            .catch(function (error) {
                dispatch({
                    type: LOGIN_USER_ERROR,
                    data: error.message
                });
            });
    }
}

export function logOutUser() {
    return dispatch => {
        dispatch({
            type: LOGOUT_USER_REQUEST
        });
        axios.post('/logout')
            .then(function (response) {
                if(response) {
                    dispatch({
                        type: LOGOUT_USER_OK,
                    });
                }
            })
            .catch(function (error) {
                dispatch({
                    type: LOGOUT_USER_ERROR,
                    data: error.message
                });
            });
    }
}

export function resetRegisterFlag() {
    return dispatch => {
        dispatch({
            type: RESET_REGISTER_FLAG
        });
    }
}

export function resetUserError() {
    return dispatch => {
        dispatch({
            type: RESET_USER_ERROR
        });
    }
}
