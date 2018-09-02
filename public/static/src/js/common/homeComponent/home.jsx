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

// 公共部分，在Node环境中无window document navigator 等对象
if (typeof window === 'undefined') {
    // 设置win变量方便在其他地方判断环境
    global.win = false;
    global.window = {};
    global.document = {};
}

// 子组件
import User from './user';
import WorkList from './workList';

import  {getUrlParam} from '../../util/util'
import '../../../scss/home.scss';

import {
    initPage
} from '../../store/actions.js';

/**
 * 将redux中的state通过props传给react组件
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapStateToProps(state) {
    console.log(state)
    return {
        userInfo: state.userInfo,
        // 假如父组件Home也需要知悉子组件WorkList的这两个状态，则可以传入这两个属性
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
        initPage: (cb) => {
            dispatch(initPage(cb));
        }
    };
}

/**
 * 个人中心主页
 */
class Home extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 初始获取数据之后的某些操作
     * @return {[type]} [description]
     */
    afterInit() {
        console.log('afterInit');
    }

    componentDidMount() {
        console.log('componentDidMount');

        // 初始化发出 INIT_PAGE 操作；
        // 已交由服务器渲染
        // this.props.initPage(() => {
            this.afterInit();
        // });
    }

    render() {
        console.log('render', this.props);

        return (
            <div>
                <User {...this.props.userInfo} />
                <WorkList />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
