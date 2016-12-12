import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { requestFetchList } from 'redux/reducers/list';

@connect(
    state => ({
        list: state.get('list')
    }),
    dispatch => bindActionCreators({ requestFetchList }, dispatch)
)
export default class List extends Component {
    static propTypes = {
        list: PropTypes.object,
        requestFetchList: PropTypes.func
    };

    _renderList() {
        return this.props.list.toArray().map(l => <li key={l.get('id')}>{l.get('name')}</li>);
    }

    render() {
        return (
            <div id="list">
                <ul>
                    {this._renderList()}
                </ul>
            </div>
        );
    }
}
