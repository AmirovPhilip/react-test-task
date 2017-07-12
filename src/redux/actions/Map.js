import {
    MARKERS_VISIBLITY_TOGGLE,
    MARKERS_MAKER_STATUS_TOGGLE,
    GET_USER_COORDINATES,
    GET_MARKERS_REQUEST,
    GET_MARKERS_OK,
    GET_MARKERS_ERROR,
    SAVE_MARKERS_REQUEST,
    SAVE_MARKERS_OK,
    SAVE_MARKERS_ERROR,
    ADD_MARKER,
    DELETE_MARKER_FROM_SERVER_REQUEST,
    DELETE_MARKER_FROM_SERVER_OK,
    DELETE_MARKER_FROM_SERVER_ERROR,
    DELETE_MARKER_ONLY_FROM_UI,
    SNACKBAR_CLOSE
} from './actionTypes'
import axios from 'axios';

export function markersVisibilityToggle(){
    return dispatch => {
        dispatch({
            type: MARKERS_VISIBLITY_TOGGLE
        });
    }
}

export function markersMakerStatusToggle(){
    return dispatch => {
        dispatch({
            type: MARKERS_MAKER_STATUS_TOGGLE
        });
    }
}

export function getMarkers(data){
    return dispatch => {
        dispatch({
            type: GET_MARKERS_REQUEST
        });
        axios.get('/markers')
            .then(function (response) {
                dispatch({
                    type: GET_MARKERS_OK,
                    data: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: GET_MARKERS_ERROR,
                    data: error.message
                });
            });
    }
}

export function saveMarkers(data){
    return dispatch => {
        dispatch({
            type: SAVE_MARKERS_REQUEST
        });
        axios.put('/addmarkers', data)
            .then(function (response) {
                dispatch({
                    type: SAVE_MARKERS_OK,
                    data: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: SAVE_MARKERS_ERROR,
                    data: error.message
                });
            });
    }
}

export function addMarker(data){
    return dispatch => {
        dispatch({
            type: ADD_MARKER,
            data: data
        });
    }
}

export function deleteMarkerFromUI(data){
    return dispatch => {
        dispatch({
            type: DELETE_MARKER_ONLY_FROM_UI,
            data: data
        });
    }
}

export function deleteMarkerFromServer(data){
    return dispatch => {
        dispatch({
            type: DELETE_MARKER_FROM_SERVER_REQUEST
        });
        axios.delete('/marker/' + data._id)
            .then(function (response) {
                dispatch({
                    type: DELETE_MARKER_FROM_SERVER_OK,
                    data: data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: DELETE_MARKER_FROM_SERVER_ERROR,
                    data: error.message
                });
            });
    }
}

export function snackbarClose(){
    return dispatch => {
        dispatch({
            type: SNACKBAR_CLOSE
        });
    }
}

export function getUserCoords(){
    return dispatch => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (data) => {
                var obj = {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                }
                dispatch({
                    type: GET_USER_COORDINATES,
                    data: obj
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
}

