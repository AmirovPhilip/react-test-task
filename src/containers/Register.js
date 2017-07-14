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

class Register extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            name: '',
            nameWrong: '',
            email: '',
            emailWrong: '',
            password: '',
            passwordWrong: '',
            repass: '',
            repassWrong: '',
        }
    }

    componentWillMount() {
        this.props.actionsUser.getSessionUser();
    }

    componentWillUnmount() {
        const { registerRequest, error } = this.props.user;
        if(registerRequest) {
            this.props.actionsUser.resetRegisterFlag();
        }
        if(error) {
            this.props.actionsUser.resetUserError();
        }
    }

    changeHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                this.setState({
                    name: e.target.value,
                    nameWrong: ''
                })
                break;
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
            case 'repass':
                this.setState({
                    repass: e.target.value,
                    repassWrong: ''
                })
                break;
            default:
                break;
        }
    }

    _resetForm() {
        this.setState({
            name: '',
            nameWrong: '',
            email: '',
            emailWrong: '',
            password: '',
            passwordWrong: '',
            repass: '',
            repassWrong: '',
        })
    }

    sendForm = () => {
        let valid = true;
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        let repass = this.state.repass;
        if(name.length < 2 || /[\/:*?"<>|:;]/.test(name)) {
            this.setState({
                nameWrong: 'min 2 chart, avoid symbols (\/:*?"<>|)'
            })
            valid = false;
        }
        if(email.length < 4 || /[\/:*?"<>|:;]/.test(email)) {
            this.setState({
                emailWrong: 'Wrong email'
            })
            valid = false;
        }
        if(password.length < 6 || /[\/:*?"<>|:;]/.test(password)) {
            this.setState({
                password: '',
                repass: '',
                passwordWrong: 'Password is too short (min 6 chars) or avoid symbols (\/:*?"<>|)'
            })
            valid = false;
        } else if(repass != password) {
            this.setState({
                repassWrong: 'Passwords do not match'
            })
            valid = false;
        }
        if(valid) {
            var data = {
                username: name,
                email: email,
                password: password
            }

            this.props.actionsUser.createUser(data);
            this._resetForm();
        }
    }

    render() {

        const { error, registerRequest } = this.props.user;

        if(registerRequest){
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
              }}/>
            );
        } else {
            return (
                <div>
                    <div className="login-form">
                        <h4>REGISTER</h4>
                        {error ? (<p style={{color: 'red'}}>{error}</p>) : ''}
                        <div>
                            <TextField
                                name="name"
                                fullWidth={true}
                                floatingLabelText="Name"
                                onChange={this.changeHandler}
                                value={this.state.name}
                                errorText={this.state.nameWrong}
                            />
                        </div>
                        <div>
                            <TextField
                                name="email"
                                fullWidth={true}
                                floatingLabelText="Email"
                                onChange={this.changeHandler}
                                type="email"
                                value={this.state.email}
                                errorText={this.state.emailWrong}
                            />
                        </div>
                        <div>
                            <TextField
                                name="pass"
                                fullWidth={true}
                                floatingLabelText="Password"
                                onChange={this.changeHandler}
                                type="password"
                                value={this.state.password}
                                errorText={this.state.passwordWrong}
                            />
                        </div>
                        <div>
                            <TextField
                                name="repass"
                                fullWidth={true}
                                floatingLabelText="Repeat Password"
                                onChange={this.changeHandler}
                                type="password"
                                value={this.state.repass}
                                errorText={this.state.repassWrong}
                            />
                        </div>
                        <br/>
                        <div className="clearfix">
                            <div className="pull-left">
                                <RaisedButton label="Register"
                                              primary={true}
                                              buttonStyle={{background: '#1976D2'}}
                                              onTouchTap={this.sendForm}/>
                            </div>
                            <div className="pull-right">
                                <Link to="/login">
                                    <FlatButton
                                        label="Sign in"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Register.propTypes = {
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
)(Register));
