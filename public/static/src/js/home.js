// 允许热替换
if (module.hot) {
    module.hot.accept();
}

if (!global._babelPolyfill) {
   require('babel-polyfill');
}

import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
import {Provider} from 'react-redux';

// 组件入口
import Home from './homeComponent/Home.jsx';
import store from './store';

/**
 * 组装Redux应用
 */
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        )
    }
}

render(<App />, document.getElementById('content'));
