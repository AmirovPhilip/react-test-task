import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import UserIcon from 'material-ui/svg-icons/social/person';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as home from '../redux/actions/Home';
import * as user from '../redux/actions/User';

import './styles/Sidebar.less';

class Sidebar extends React.Component {

    constructor(props){
        super(props);
    }

    logOut = () => {
        const { session } = this.props.user;
        if(session) {
            this.props.actionsUser.logOutUser();
        }
    }
    render() {

        const { sidebarVisibility } = this.props.home;
        const { name, email } = this.props.user;

        return (
            <Drawer className="sidebar" open={sidebarVisibility}>
                <header>
                    <div className="user-icon-wrap">
                        <UserIcon style={{width: '40px', height: '40px'}}/>
                    </div>
                    <div className="user-email-wrap">
                        <span className="user">{name}</span>
                        <span className="email">{email}</span>
                    </div>
                </header>

                <List>
                    <Link to="/"><ListItem primaryText="Map" /></Link>
                </List>
                <List>
                    <Link to="/about"><ListItem primaryText="About" /></Link>
                </List>
                <Divider />
                <List>
                    <ListItem
                        primaryText="Log Out"
                        onTouchTap={this.logOut}/>
                </List>

            </Drawer>
        );
    }
}

Sidebar.propTypes = {
    sidebarVisibility: PropTypes.bool,
    user: PropTypes.object,
    home: PropTypes.object,
    actionsHome: PropTypes.object,
    actionsUser: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        home: state.home,
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
)(Sidebar));