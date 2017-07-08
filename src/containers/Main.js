import React from 'react'
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';
//import * as user from '../redux/actions/user';
//import { withRouter } from 'react-router-dom'
//import { CardPanel } from 'react-materialize'

//import Header from './../components/PageHeader'
//import Footer from './../components/PageFooter'

//import '../css/style.scss'

export default class Main extends React.Component {

    //constructor(props){
    //    super(props);
    //    this.logOutAction = this.logOutAction.bind(this);
    //    this.errorClose = this.errorClose.bind(this);
    //}

    //logOutAction(){
    //    this.props.actionsUser.logOutUser();
    //}
    //
    //errorClose(){
    //    this.props.actionsUser.hideError();
    //}
    //
    //componentWillMount(){
    //    this.props.actionsUser.checkSessionUser();
    //}

    render() {

        return (
            <div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
//
//function mapStateToProps(state) {
//    return {
//        user: state.user
//    };
//}
//
//function mapDispatchToProps(dispatch) {
//    return {
//        actionsUser: bindActionCreators(user, dispatch)
//    }
//}
//
//export default withRouter(connect(
//    mapStateToProps,
//    mapDispatchToProps
//)(Main));