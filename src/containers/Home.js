import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    withRouter,
    Redirect
} from 'react-router-dom';

import CustomMap from '../components/Map';
import Loading from '../components/Loading';

import '../css/global.less';


import * as home from '../redux/actions/Home';
import * as map from '../redux/actions/Map';
import * as user from '../redux/actions/User';

class Home extends React.Component {

    componentWillMount() {
        this.props.actionsUser.getSessionUser();
    }

    componentDidMount(){
        const { session } = this.props.user;
        if(session) {
            this.props.actionsMap.getUserCoords();
            this.props.actionsMap.getMarkers();
        }
    }

    render() {

        const { userLatitude, userLongitude } = this.props.map;
        const { session } = this.props.user;

        const loading = (
            <Loading/>
        )

        const mapContainer = (
            <CustomMap {...this.props.map}
                       {...this.props.actionsMap}/>
        )

        if(!session){
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
              }}/>
            );
        } else if(userLatitude && userLongitude){
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
    user: PropTypes.object,
    actionsHome: PropTypes.object,
    actionsMap: PropTypes.object,
    actionUser: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        home: state.home,
        map: state.map,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsHome: bindActionCreators(home, dispatch),
        actionsMap: bindActionCreators(map, dispatch),
        actionsUser: bindActionCreators(user, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
