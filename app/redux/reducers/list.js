import I from 'immutable';
import { createReducer, createAction } from 'redux/creator';
import {
    FETCH_LIST_DATA,
    FETCH_LIST_DATA_SUCCESS,
    FETCH_LIST_DATA_FAIL
} from 'redux/action-types';

let defaultState = I.fromJS([
    {
        id: 1,
        name: '复仇之魂 Shendelzare Silkwood'
    },
    {
        id: 2,
        name: '变体精灵 Morphling 墨斐琳'
    },
    {
        id: 3,
        name: '剑圣 Yurnero 尤尼路·扎伽呐塔'
    },
    {
        id: 4,
        name: '之骑士 Luna Moonfang 露娜·月牙'
    },
    {
        id: 5,
        name: '刚背兽 Rigwarl 里格瓦尔'
    }
]);

export default createReducer(I.fromJS(defaultState), {
    [FETCH_LIST_DATA_SUCCESS](state, action) {
        return I.fromJS(saction.result);
    }
});

export function requestFetchList() {
    return {
        types: [FETCH_LIST_DATA, FETCH_LIST_DATA_SUCCESS, FETCH_LIST_DATA_FAIL],
        promise: () => {
            return new Promise(resolve => resolve([]));
        }
    };
}