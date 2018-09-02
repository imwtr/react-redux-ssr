
import * as actionTypes from './types';

/**
 * 添加任务
 * @param {[type]} todoList [description]
 * @param {[type]} content [description]
 */
export function addWorkTodo(todoList, content) {
    let id = Math.random();

    let todo = [...todoList, {
        id,
        content
    }];

    return {
        type: actionTypes.ADD_WORK_TODO,
        payload: todo
    }
}
/**
 * 设置任务完成
 * @param {[type]} todoList [description]
 * @param {[type]} doneList [description]
 * @param {[type]} id [description]
 */
export function setWorkDone(todoList, doneList, id) {
    let work = null,
        workIndex = -1;
    todoList.forEach((item, index) => {
        if (item.id === id) {
            work = item;
            workIndex = index;

            return false;
        }
    });

console.log(workIndex, id)
    if (work) {
        doneList = doneList.concat(work);
        todoList.splice(workIndex, 1);
    }

    return {
        type: actionTypes.SET_WORK_DONE,
        payload: {
            todo: todoList,
            done: doneList
        }
    }
}

/**
 * 初始化页面信息
 * 此action为redux-saga所监听，将传入saga中执行
 */
export function initPage(cb) {
    console.log(122)
    return {
        type: actionTypes.INIT_PAGE,
        payload: cb
    };
}
