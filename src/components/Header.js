import React from 'react';
import {
    AppBar,
    FlatButton,
    IconButton,
    MenuItem,
    IconMenu
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom'


class Login extends React.Component {
    static muiName = 'FlatButton';

    render() {
        return (
            <FlatButton {...this.props} label="Login" />
        );
    }
}

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Refresh" />
        <Link to="/about"><MenuItem primaryText="About Us" /></Link>
        <MenuItem primaryText="Sign out" />
    </IconMenu>
);
Logged.muiName = 'IconMenu';

const styles = {
    background: '#1976D2',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999
}

export default class Header extends React.Component {
    render() {

        const logged = true;

        return (
           <div className="page-header">
               <AppBar
                   style={styles}
                   title={<Link to="/">Map Application</Link>}
                   iconStyleLeft={{display: 'none'}}
                   iconElementRight={logged ? <Logged /> : <Login />}
               />
           </div>

        )
    }
}
