import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';


import { BrowserRouter } from 'react-router-dom';
import App from './app';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

injectTapEventPlugin();

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    { Component }
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
}

render(App);

if (module.hot) {
    module.hot.accept(() => {
        render(App);
    })
}

