import React, { PropTypes } from 'react';
import {
    TextField,
    FlatButton,
    RaisedButton
} from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Link,
    withRouter,
    Redirect
} from 'react-router-dom';


import * as user from '../redux/actions/User';

import './styles/Login.less';

class Login extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillMount() {
        this.props.actionsUser.getSessionUser();
    }

    componentWillUnmount() {
        const { error } = this.props.user;
        if(error) {
            this.props.actionsUser.resetUserError();
        }
    }

    _resetForm() {
        this.setState({
            email: '',
            emailWrong: '',
            password: '',
            passwordWrong: '',
        })
    }

    changeHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                this.setState({
                    email: e.target.value,
                    emailWrong: ''
                })
                break;
            case 'pass':
                this.setState({
                    password: e.target.value,
                    passwordWrong: ''
                })
                break;
            default:
                break;
        }
    }

    sendForm = () => {
        let valid = true;
        let email = this.state.email;
        let password = this.state.password;
        if(email.length < 4 || /[\/:*?"<>|:;]/.test(email)) {
            this.setState({
                emailWrong: 'Wrong email'
            })
            valid = false;
        }
        if(password.length < 6 || /[\/:*?"<>|:;]/.test(password)) {
            this.setState({
                password: '',
                passwordWrong: 'Wrong Password'
            })
            valid = false;
        }
        if(valid) {
            var data = {
                email: email,
                password: password
            }

            this.props.actionsUser.loginUser(data);
            this._resetForm();
        }
    }

    render() {

        const { error, session } = this.props.user;

        if(session){
            return (
                <Redirect to={{
                    pathname: '/',
                    state: { from: this.props.location }
              }}/>
            );
        } else {
            return (
                <div>
                    <div className="login-form">
                        <h4>LOGIN</h4>
                        {error ? (<p style={{color: 'red'}}>{error}</p>) : ''}
                        <div>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Email"
                                name="email"
                                type="email"
                                onChange={this.changeHandler}
                                value={this.state.email}
                                errorText={this.state.emailWrong}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Password"
                                name="pass"
                                type="password"
                                onChange={this.changeHandler}
                                value={this.state.password}
                                errorText={this.state.passwordWrong}
                            />
                        </div>
                        <br/>
                        <div className="clearfix">
                            <div className="pull-left">
                                <RaisedButton label="Log in"
                                              primary={true}
                                              buttonStyle={{background: '#1976D2'}}
                                              onTouchTap={this.sendForm}/>
                            </div>
                            <div className="pull-right">
                                <Link to="/register">
                                    <FlatButton label="Sign up" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Login.propTypes = {
    user: PropTypes.object,
    actionsUser: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsUser: bindActionCreators(user, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));