import {delay} from 'redux-saga';
import {put, fork, takeEvery, takeLatest, call, all, select} from 'redux-saga/effects';

import * as actionTypes from './types';

/**
 * 获取用户信息
 * @yield {[type]} [description]
 */
function* getUserInfoHandle() {
    let state = yield select();

    return yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                sex: 'male',
                age: 18,
                name: '王羲之',
                avatar: '/public/static/imgs/avatar.png'
            });
        }, 500);
    });
}

/**
 * 获取工作列表
 * @yield {[type]} [description]
 */
function* getWorkListHandle() {
    let state = yield select();

    return yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                todo: [{
                    id: '1',
                    content: '跑步'
                }, {
                    id: '2',
                    content: '游泳'
                }],

                done: [{
                    id: '13',
                    content: '看书'
                }, {
                    id: '24',
                    content: '写代码'
                }]
            });
        }, 1000);
    });
}

/**
 * 获取页面数据，action.payload中如果为回调，可以处理一些异步数据初始化之后的操作
 * @param {[type]} action        [description]
 * @yield {[type]} [description]
 */
function* getPageInfoAsync(action) {
    console.log(action);

    let userInfo = yield call(getUserInfoHandle);

    yield put({
        type: actionTypes.INIT_USER_INFO,
        payload: userInfo
    });

    let workList = yield call(getWorkListHandle);

    yield put({
        type: actionTypes.INIT_WORK_LIST,
        payload: workList
    });

    console.log('saga done');

    typeof action.payload === 'function' && action.payload();
}

/**
 * 获取页面数据
 * @yield {[type]} [description]
 */
export default function* getPageInfo() {
    yield takeLatest(actionTypes.INIT_PAGE, getPageInfoAsync);
}
