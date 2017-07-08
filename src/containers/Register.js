import React from 'react';
//import {Row, Col, Button, Icon} from 'react-materialize'
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';


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
                Register
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
