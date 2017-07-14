import React, { PropTypes } from 'react';
import {
    AppBar,
    FlatButton,
    IconButton,
    MenuItem,
    IconMenu,
} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as home from '../redux/actions/Home';
import * as user from '../redux/actions/User';

import './styles/Header.less'

class Header extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    sidebarToggle = () => {
        this.props.actionsHome.sidebarToggle();
    }

    logOut = () => {
        const { session } = this.props.user;
        if(session) {
            this.props.actionsUser.logOutUser();
        }
    }

    render() {

        let header = '';
        const { sidebarVisibility } = this.props.home;
        const { session } = this.props.user;

        const btn = sidebarVisibility ? (<NavigationClose onClick={this.sidebarToggle}/>) : (<NavigationMenu onClick={this.sidebarToggle}/>);

        if(session) {
            header = (
                <div className="page-header">
                    <AppBar
                        title={<Link to="/">Map Application</Link>}
                        iconElementLeft={<IconButton>{btn}</IconButton>}
                        iconElementRight={
                            <FlatButton
                                label="Log Out"
                                onTouchTap={this.logOut}/>
                        }
                    />
                </div>
            )
        } else {
            header = (
                <div className="page-header">
                    <AppBar
                        showMenuIconButton={false}
                        title={<Link to="/">Map Application</Link>}
                    />
                </div>
            )
        }

        return header;
    }
}

Header.propTypes = {
    home: PropTypes.object,
    user: PropTypes.object,
    actionsHome: PropTypes.object,
    actionsUser: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        home: state.home,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsHome: bindActionCreators(home, dispatch),
        actionsUser: bindActionCreators(user, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));