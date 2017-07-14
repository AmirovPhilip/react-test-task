import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    withRouter,
    Redirect
} from 'react-router-dom';

import './styles/About.less';

import * as user from '../redux/actions/User';

class About extends React.Component {

    componentWillMount() {
        this.props.actionsUser.getSessionUser();
    }

    render() {

        const { session } = this.props.user;

        if(!session){
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
              }}/>
            );
        } else {
            return (
                <div className="about-wrap">
                    <div className="container">
                        <h2>About</h2>
                        <div className="contacts">
                            <p><span>Email:</span><a href="mailto:filip.amirov@gmail.com">filip.amirov@gmail.com</a></p>
                            <p><span>GitHub:</span><a target="_blank" href="https://github.com/AmirovPhilip/react-test-task">github.com/AmirovPhilip/react-test-task</a></p>
                            <p><span>Linkedin</span><a target="_blank" href="https://www.linkedin.com/in/amirov-philip-3386ba142/">www.linkedin.com/in/amirov-philip</a></p>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

About.propTypes = {
    user: PropTypes.object,
    actionUser: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionsUser: bindActionCreators(user, dispatch),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(About));