
const livechatRoute = {
    path: '/',
    component: require('components/app'),
    indexRoute: {
        // onEnter: requireAuth,
        // component: require('./../components_new/livechat/dashboard/dashboard')
    },
    childRoutes: []
};

const router = {
    childRoutes: [
        livechatRoute
    ]
};

export default router;
