// 允许热替换
if (module.hot) {
    module.hot.accept();
}

if (!global._babelPolyfill) {
   require('babel-polyfill');
}

import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

import {
    addWorkTodo,
    setWorkDone
} from '../../store/actions.js';

/**
 * 将redux中的state通过props传给react组件
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapStateToProps(state) {
    return {
        todo: state.todo,
        done: state.done
    };
}

/**
 * 将redux中的dispatch方法通过props传给react组件
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapDispatchToProps(dispatch, ownProps) {
    return {
        // 通过props传入initPage这个dispatch方法
        addWorkTodo: (todoList, content) => {
            dispatch(addWorkTodo(todoList, content));
        },
        setWorkDone: (todoList, doneList, id) => {
            dispatch(setWorkDone(todoList, doneList, id));
        }
    };
}

/**
 * 待办事项
 */
class WorkList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    /**
     * 设置工作完成
     * @param {[type]} id [description]
     * @param {[type]} e  [description]
     */
    setTodoDone(id, e) {
        // 执行 SET_WORK_DONE
        this.props.setWorkDone(this.props.todo, this.props.done, id);
    }

    /**
     * 添加工作事项
     */
    addTodo() {
        let content = this.workContent.value;

        if (!content || !content.trim()) {
            this.workContent.value = '';
            this.workContent.focus();
            return;
        }

        // 执行 ADD_WORK_TODO
        this.props.addWorkTodo(this.props.todo, content.trim());

        this.workContent.value = '';
    }

    render() {
        return (
            <div className="work-list-wrap">
                <div className="add-work">
                    <input type="text" ref={input => {this.workContent = input}} placeholder="输入待办事项" />
                    <input type="button" value="添加" onClick={this.addTodo.bind(this)}/>
                </div>
                <div className="work-list">
                    <div className="todo-list-wrap">
                        <h4>待处理事项</h4>
                        <ol className="todo-list-items">
                        {
                            this.props.todo.map(item => {
                                return (
                                    <li key={item.id}>
                                        {item.content}
                                        <a href="javacript:;" className="todo-list__done" onClick={this.setTodoDone.bind(this, item.id)}>→</a>
                                    </li>
                                )
                            })
                        }
                        </ol>
                    </div>
                    <div className="done-list-wrap">
                        <h4>已完成工作</h4>
                        <ol className="done-list-items">
                        {
                            this.props.done.map(item => {
                                return (
                                    <li key={item.id}>{item.content}</li>
                                )
                            })
                        }
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkList);
