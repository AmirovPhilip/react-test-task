import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
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
                <div>User</div>

                <List>
                    <Link to="/"><ListItem insetChildren={true} primaryText="Map" /></Link>
                </List>
                <List>
                    <Link to="/about"><ListItem insetChildren={true} primaryText="About As" /></Link>
                </List>
                <Divider inset={true} />
                <List>
                    <Link to="/login"><ListItem insetChildren={true} primaryText="Log Out" /></Link>
                </List>

            </Drawer>
        );
    }
}

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