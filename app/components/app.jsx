import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        let props: Object = _.assign({}, this.state, this.props);
        delete props.children;
        return (
            <div id="app">
                <div id="wrapper">
                    {this.props.children && React.cloneElement(this.props.children, props)}
                </div>
            </div>
        );
    }
}
