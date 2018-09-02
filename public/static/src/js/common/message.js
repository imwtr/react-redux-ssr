// 允许热替换
if (module.hot) {
    module.hot.accept();
}

if (!global._babelPolyfill) {
   require('babel-polyfill');
}

import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';

import  {getUrlParam} from '../util/util'
import '../../scss/message.scss';

// 公共部分，在Node环境中无window document navigator 等对象
if (typeof window === 'undefined') {
    global.window = {};
    global.document = {};
}

/**
 * 消息列表
 */
class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: []
        };

        // 根据服务器返回的初始状态来初始化
        if (typeof PRELOAD_STATE !== 'undefined') {
            this.state.msgs = PRELOAD_STATE;
            // 清除
            PRELOAD_STATE = null;
            document.getElementById('preload-state').remove();
        } else {
            this.state.msgs = this.props.preloadState;
        }

        console.log(this.state);
    }

    componentDidMount() {

    }

    // 消息已阅
    msgRead(id, e) {
        let msgs = this.state.msgs;
        let itemIndex = msgs.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            msgs.splice(itemIndex, 1);

            this.setState({
                msgs
            });
        }
    }

    render() {
        return (
            <div>
                <h4>消息列表</h4>
                <div className="msg-items">
                {
                    this.state.msgs.map(item => {
                        return (
                            <div key={item.id} className="msg-item">
                                <p className="msg-item__header">{item.userName} - {item.time}</p>
                                <p className="msg-item__content">{item.content}</p>
                                <a href="javascript:;" className="msg-item__read" onClick={this.msgRead.bind(this, item.id)}>&times;</a>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

export default Message;
