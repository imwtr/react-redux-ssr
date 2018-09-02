import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
// import {thunk} from 'redux-thunk';

import reducers from './reducers';
import wordListSaga from './workListSaga';
import state from './state';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let defaultState = state;

// 用于SSR
// 根据服务器返回的初始状态来初始化
if (typeof PRELOAD_STATE !== 'undefined') {
    defaultState = Object.assign({}, defaultState, PRELOAD_STATE);
    // 清除
    PRELOAD_STATE = null;
    document.getElementById('preload-state').remove();
}

let store = createStore(
    reducers,
    defaultState,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    ));

sagaMiddleware.run(wordListSaga);

export default store;
