if (module.hot) {
    module.hot.accept();
}

import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
import Home from './homeComponent/home.jsx';
import {Provider} from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        // 如果为Node环境，则取由服务器返回的store值，否则使用 ../store中返回的值
        let st = global.win === false ? this.props.store : store;

        return (
            <Provider store={st}>
                <Home />
            </Provider>
        )
    }
}

export default App;

