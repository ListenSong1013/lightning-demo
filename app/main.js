import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import I from 'immutable';
import initStore from './redux/init';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import moment from 'moment';
moment.locale('zh-cn');

(async() => {
    // load routes after int-polyfill
    const routes = require('./routes');

    let createElement = (Component, props) => {
        return <Component {...props} />;
    };

    const store = initStore(I.fromJS({}));
    let lastRoute = null;
    let lastRouteJS = null;
    const history = syncHistoryWithStore(browserHistory, store, {
        selectLocationState: (state) => {
            //cache router
            if (state.get('router') !== lastRoute) {
                lastRoute = state.get('router');
                lastRouteJS = lastRoute.toJS();
                return lastRouteJS;
            } else {
                return lastRouteJS;
            }
        }
    });

    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}
                    onUpdate={urlUpdate}
                    routes={routes}
                    createElement={createElement} />
        </Provider>,
        document.getElementById('meiqiaApp'));
})();
