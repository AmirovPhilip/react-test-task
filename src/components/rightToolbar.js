import React from 'react';

import './styles/RightToolbar.less'

export default class RightToolbar extends React.Component {

    render() {

        const { markersMakerStatus, markersShow, saveBtnState  } = this.props

        const activeMarkersIcon = markersMakerStatus ? 'active' : '';
        const disableSave = saveBtnState ? '' : 'disabled'
        console.log(this.props)
        return (
            <div className="right-toolbar-wrap">
                <ul>
                    <li className={`item ${activeMarkersIcon}`}
                        onClick={this.props.markersMakerStatusToggle}>
                            <i className="fa fa-map-marker" aria-hidden="true"/>
                    </li>
                    <li className="item"
                        onClick={this.props.markersVisibilityToggle}>
                            {markersShow ? <i className="fa fa-eye" aria-hidden="true"/> : <i className="fa fa-eye-slash" aria-hidden="true"/>}
                    </li>
                    <li className={`item ${disableSave}`}
                        onClick={this.props.saveMarkers}>
                        <i className="fa fa-floppy-o" aria-hidden="true"/>
                    </li>
                </ul>
            </div>
        );
    }
}
