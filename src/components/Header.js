import React from 'react';
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

import './styles/Header.less'

class Header extends React.Component {

    constructor(props, context){
        super(props, context);
        this.sidebarToggle = this.sidebarToggle.bind(this);
    }

    sidebarToggle(){
        this.props.actionsHome.sidebarToggle();
    }

    render() {

        const logged = true;
        const { sidebarVisibility } = this.props.home;

        const btn = sidebarVisibility ? (<NavigationClose onClick={this.sidebarToggle}/>) : (<NavigationMenu onClick={this.sidebarToggle}/>);

        return (
           <div className="page-header">
               <AppBar
                   title={<Link to="/">Map Application</Link>}
                   iconElementLeft={<IconButton>{btn}</IconButton>}
                   iconElementRight={logged ? <FlatButton label="Log Out" /> : <FlatButton label="Login" />}
               >
               </AppBar>
           </div>

        )
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
)(Header));