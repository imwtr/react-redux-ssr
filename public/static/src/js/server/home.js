import {createStore} from 'redux';
import reducers from '../store/reducers';
import App from '../common/home';
import defaultState from '../store/state';

let ReactDOMServer = require('react-dom/server');

export function init(preloadState) {
    // console.log(preloadState);

    let defaultState = Object.assign({}, defaultState, preloadState);

    // 服务器需要为每个请求创建一份store，并将状态初始化为preloadState
    let store = createStore(
        reducers,
        defaultState
    );

    return ReactDOMServer.renderToString(<App store={store} />);
};
