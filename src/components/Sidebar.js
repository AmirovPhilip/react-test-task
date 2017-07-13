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

import './styles/Sidebar.less';

class Sidebar extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        const { sidebarVisibility } = this.props.home;

        return (
            <Drawer className="sidebar" open={sidebarVisibility}>
                <header>
                    <div className="user-icon-wrap">
                        <UserIcon style={{width: '40px', height: '40px'}}/>
                    </div>
                    <div className="user-email-wrap">
                        <span>test@gmail.com</span>
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
                    <Link to="/login"><ListItem primaryText="Log Out" /></Link>
                </List>

            </Drawer>
        );
    }
}

Sidebar.propTypes = {
    sidebarVisibility: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        home: state.home,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsHome: bindActionCreators(home, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar));