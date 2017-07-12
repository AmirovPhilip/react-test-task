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
} from '../actions/actionTypes'

const initialState = {
    markersShow: true,
    markersMakerStatus: true,
    markers: [],
    userLatitude: 0,
    userLongitude: 0,
    saveBtnState: false,
    snackbarStatus: false,
    snackbarText: ''
};

export default function (state = initialState, action) {

    switch (action.type) {

        case MARKERS_VISIBLITY_TOGGLE:
            return { ...state, ...{
                markersShow: !state.markersShow
            }}
        case MARKERS_MAKER_STATUS_TOGGLE:
            return { ...state, ...{
                markersMakerStatus: !state.markersMakerStatus
            }}
        case GET_USER_COORDINATES:
            return { ...state, ...{
                userLatitude: action.data.latitude,
                userLongitude: action.data.longitude
            }}
        case ADD_MARKER:
            action.data.action = 'insert';
            let arr = state.markers.concat(action.data);
            return { ...state, markers: [...arr], ...{
                saveBtnState: true,
                snackbarStatus: true,
                snackbarText: 'Marker was added.'
            }};
        case SAVE_MARKERS_REQUEST:
            return { ...state }
        case SAVE_MARKERS_OK:
            return { ...state, ...{
                saveBtnState: false,
                markers: [...action.data],
                snackbarStatus: true,
                snackbarText: 'All markers was saved.'
            }};
        case SAVE_MARKERS_ERROR:
            return { ...state, ...{
                snackbarStatus: true,
                snackbarText: action.data
            }}
        case GET_MARKERS_REQUEST:
            return { ...state }
        case GET_MARKERS_OK:
            return { ...state,
                markers: [...action.data],
            };
        case GET_MARKERS_ERROR:
            return { ...state, ...{
                snackbarStatus: true,
                snackbarText: action.data
            }}
        case DELETE_MARKER_ONLY_FROM_UI:
            let newMarkers = state.markers;
            for(var i = 0; i < newMarkers.length; i++){
                if(newMarkers[i].latitude == action.data.latitude && newMarkers[i].longitude == action.data.longitude) {
                    newMarkers.splice(i, 1);
                    break;
                }
            }
            return { ...state,
                markers: [...newMarkers]
            }
        case DELETE_MARKER_FROM_SERVER_REQUEST:
            return { ...state }
        case DELETE_MARKER_FROM_SERVER_OK:
            let newDelMarkers = state.markers;
            for(var i = 0; i < newDelMarkers.length; i++){
                if(newDelMarkers[i]._id == action.data._id) {
                    newDelMarkers.splice(i, 1);
                    break;
                }
            }
            return { ...state,
                markers: [...newDelMarkers]
            }
        case DELETE_MARKER_FROM_SERVER_ERROR:
            return { ...state, ...{
                snackbarStatus: true,
                snackbarText: action.data
            }}
        case SNACKBAR_CLOSE:
            return { ...state, ...{
                snackbarStatus: false,
                snackbarText: ''
            }}
        default:
            return state

    }

}



