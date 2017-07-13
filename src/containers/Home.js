import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomMap from '../components/Map';
import Loading from '../components/Loading';

import '../css/global.less';


import * as home from '../redux/actions/Home';
import * as map from '../redux/actions/Map';

class Home extends React.Component {

    componentDidMount(){
        this.props.actionsMap.getUserCoords();
        this.props.actionsMap.getMarkers();
    }

    render() {

        const { markersShow, markersMakerStatus, userLatitude, userLongitude, saveBtnState } = this.props.map;

        const loading = (
            <Loading/>
        )

        const mapContainer = (
            <CustomMap {...this.props.map}
                       {...this.props.actionsMap}/>
        )

        if(userLatitude && userLongitude){
            return (
                <div>
                    {mapContainer}
                </div>
            );
        } else {
            return loading;
        }
    }
}

Home.propTypes = {
    map: PropTypes.object,
    home: PropTypes.object,
    actionsHome: PropTypes.object,
    actionsMap: PropTypes.object
};

function mapStateToProps(state) {
    return {
        home: state.home,
        map: state.map,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsHome: bindActionCreators(home, dispatch),
        actionsMap: bindActionCreators(map, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
