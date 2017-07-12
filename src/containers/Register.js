import React from 'react';
import {
    TextField,
    FlatButton,
    RaisedButton
} from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


//import * as articles from '../redux/actions/articles';

export default class Register extends React.Component {

    //constructor(props, context){
    //    super(props, context);
    //    this.addArticleDispatch = this.addArticleDispatch.bind(this);
    //}
    //
    //addArticleDispatch(data){
    //    this.props.actionsArticles.addArticle(data);
    //}
    //
    //componentWillMount(){
    //    const { login } = this.props.user;
    //    if(login){
    //        this.props.actionsArticles.getArticleFromServer();
    //    }
    //}

    render() {
        return (
            <div>
                <div className="login-form">
                    <h4>REGISTER</h4>
                    <div>
                        <TextField
                            fullWidth={true}
                            floatingLabelText="Email"
                            type="email"
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth={true}
                            floatingLabelText="Password"
                            type="password"
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth={true}
                            floatingLabelText="Repeat Password"
                            type="password"
                        />
                    </div>
                    <br/>
                    <div className="clearfix">
                        <div className="pull-left">
                                    <RaisedButton label="Register"
                                                  primary={true}
                                                  buttonStyle={{background: '#1976D2'}} />
                        </div>
                        <div className="pull-right">
                            <Link to="/login">
                                <FlatButton label="Sign in" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//function mapStateToProps(state) {
//    return {
//        user: state.user,
//        articles: state.articles
//    };
//}
//
//function mapDispatchToProps(dispatch) {
//    return {
//        actionsArticles: bindActionCreators(articles, dispatch)
//    }
//}
//
//export default withRouter(connect(
//    mapStateToProps,
//    mapDispatchToProps
//)(Home));
