import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from '2gis-maps-react';
import '../css/global.less'


//import * as articles from '../redux/actions/articles';

export default class Home extends React.Component {

    //constructor(props, context){
    //    super(props, context);
    //    this.addArticleDispatch = this.addArticleDispatch.bind(this);
    //}
    //
    //addArticleDispatch(data){
    //    this.props.actionsArticles.addArticle(data);
    //}
    //

    componentDidMount(){
        DG.then(function() {
            var map;

            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });

            map.locate({setView: true, watch: true})
                .on('locationfound', function(e) {
                    DG.marker([e.latitude, e.longitude]).addTo(map);
                })
                .on('locationerror', function(e) {
                    DG.popup()
                        .setLatLng(map.getCenter())
                        .setContent('Доступ к определению местоположения отключён')
                        .openOn(map);
                });
        });
    }

    render() {
        return (
            <div className="map-wrap">
                <div id="map" style={{width: '100%', height: '100%'}}></div>
            </div>
        );
    }
}

/*


 <Map
 style={{
 width: '100%',
 height: 'calc(100vh - 64px)',
 marginTop: '64px'
 }}
 center={[54.98, 82.89]}
 zoom={13}
 />

 */

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
