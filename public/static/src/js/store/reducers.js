import {combineReducers} from 'redux';

import * as actionTypes from './types';
import defaultState from './state';

/**
 * 工作列表处理
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function workListReducer(state = defaultState, action) {
    switch (action.type) {
        // 初始化用户信息
        case actionTypes.INIT_USER_INFO:
            // 返回新的状态
            return Object.assign({}, state, {
                userInfo: action.payload
            });

        // 初始化工作列表
        case actionTypes.INIT_WORK_LIST:
            return Object.assign({}, state, {
                todo: action.payload.todo,
                done: action.payload.done
            });

        // 添加任务
        case actionTypes.ADD_WORK_TODO:
            return Object.assign({}, state, {
                todo: action.payload
            });

        // 设置任务完成
        case actionTypes.SET_WORK_DONE:
            return Object.assign({}, state, {
                todo: action.payload.todo,
                done: action.payload.done
            });

        default:
            return state
    }
}

export default workListReducer;

// export default combineReducers({
//     workListReducer
// });
