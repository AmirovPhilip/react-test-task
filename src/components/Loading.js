import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

import './styles/Loading.less'

export default class Loading extends React.Component {

    render() {
        return (
            <div className="loading-wrap">
                <h4>Loading...</h4>
                <LinearProgress mode="indeterminate" color="#1976D2"/>
            </div>
        );
    }
}
