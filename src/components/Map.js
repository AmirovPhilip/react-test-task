import React from 'react';
import {
    Map,
    Marker,
    DivIcon,
    Popup,
} from '2gis-maps-react';

import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import RightToolbar from './RightToolbar';
import './styles/Map.less';

import markerPNG from '../images/marker.png';

export default class CustomMap extends React.Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            dialogOpen: false,
            deleteMarker: null,
        }
    }

    onclickHandler = (e) => {
        const { markersMakerStatus } = this.props;
        if(markersMakerStatus) {
            if(e.originalEvent.target.tagName === 'IMG'){
                var obj = {
                    //id: '_' + Math.random().toString(36).substr(2, 9),
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng
                }
                this.props.addMarker(obj);
            }
        }
    }

    handleOpenDialog = (val, e) => {
        console.log(val)
        this.setState({
            dialogOpen: true,
            deleteMarker: val,
        });
    };

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
            deleteMarker: null,
        });
    }

    handleRequestClose = () => {
        this.props.snackbarClose();
    }

    saveMarkersHandle = () => {
        this.props.saveMarkers(this.props.markers);
    }

    deleteMarker =() => {
        if(this.state.deleteMarker._id) {
            this.props.deleteMarkerFromServer(this.state.deleteMarker);
        } else {
            this.props.deleteMarkerFromUI(this.state.deleteMarker);
        }
        this.setState({
            dialogOpen: false,
            id: null,
            key: null
        });
    }

    render() {
        const {
            userLatitude,
            userLongitude,
            markersMakerStatus,
            markersShow,
            saveBtnState,
            markers,
            snackbarStatus,
            snackbarText } = this.props;

        const userMarker = (
            <div className='marker'>
                <div className='dot'></div>
                <div className='pulse'></div>
            </div>
        )

        const dialogBtns = [
            <RaisedButton
                label="Delete"
                primary={true}
                onTouchTap={this.deleteMarker}
                buttonStyle={{background: '#1976D2'}}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseDialog}
            />,
        ];

        let mapJSX = '';
        let markersJSX = null;

        if(markersShow && markers.length){
            markersJSX = markers.map((val, key) => {
                return (
                    <Marker
                        pos={[val.latitude, val.longitude]}
                        key={key}
                        draggable={false}
                        onClick={this.handleOpenDialog.bind(this, val)}>
                    </Marker>
                )
            })
            mapJSX = (
                <Map
                    style={{
                        width: '100%',
                        height: 'calc(100vh - 64px)',
                        marginTop: '64px',
                        cursor: markersMakerStatus ? `url(${markerPNG}) 10 30, auto` : 'default'
                    }}
                    center={[userLatitude, userLongitude]}
                    zoom={13}
                    onClick={this.onclickHandler}
                >
                    <Marker
                        label="Your position"
                        draggable={true}
                        pos={[userLatitude, userLongitude]}
                    >
                        <DivIcon className="user-marker">
                            {userMarker}
                        </DivIcon>
                    </Marker>

                    {markersJSX}

                </Map>
            )
        } else {
            mapJSX = (
                <Map
                    style={{
                        width: '100%',
                        height: 'calc(100vh - 64px)',
                        marginTop: '64px',
                        cursor: markersMakerStatus ? `url(${markerPNG}) 10 30, auto` : 'default'
                    }}
                    center={[userLatitude, userLongitude]}
                    zoom={13}
                    onClick={this.onclickHandler.bind(this)}
                >
                    <Marker
                        label="Your position"
                        draggable={true}
                        pos={[userLatitude, userLongitude]}
                    >
                        <DivIcon className="user-marker">
                            {userMarker}
                        </DivIcon>
                    </Marker>

                </Map>
            )
        }


        return (
            <div className="map-wrap">

                {mapJSX}
                <RightToolbar markersShow={markersShow}
                              markersMakerStatus={markersMakerStatus}
                              saveBtnState={saveBtnState}
                              markersVisibilityToggle={this.props.markersVisibilityToggle}
                              markersMakerStatusToggle={this.props.markersMakerStatusToggle}
                              saveMarkers={this.saveMarkersHandle}/>
                <Snackbar
                    open={snackbarStatus}
                    message={snackbarText}
                    autoHideDuration={2000}
                    contentStyle={{textAlign: 'center'}}
                    onRequestClose={this.handleRequestClose}
                />
                <Dialog
                        actions={dialogBtns}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleCloseDialog}
                    >
                    Delete this marker?
                </Dialog>
            </div>
        );
    }
}
