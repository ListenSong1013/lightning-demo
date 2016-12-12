let actions = [
    'FETCH_LIST_DATA',
    'FETCH_LIST_DATA_SUCCESS',
    'FETCH_LIST_DATA_FAIL'
];
const _actions = {};
actions.forEach((action) => _actions[action] = action);
export default _actions;