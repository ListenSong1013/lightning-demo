
const indexRoute = {
    path: '/',
    component: require('components/app'),
    indexRoute: {
        onEnter: () => {},
        component: require('../components/list/index')
    },
    childRoutes: []
};

export default {
    childRoutes: [
        indexRoute
    ]
};
