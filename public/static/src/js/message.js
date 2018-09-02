// 允许热替换
if (module.hot) {
    module.hot.accept();
}

if (!global._babelPolyfill) {
   require('babel-polyfill');
}

import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';

import  {getUrlParam} from './util/util'
import '../scss/message.scss';

/**
 * 消息列表
 */
class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgs: []
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                msgs: [{
                    id: '1',
                    content: '我是消息我是消息我是消息',
                    time: '2018-11-23 12:33:44',
                    userName: '王羲之'
                }, {
                    id: '2',
                    content: '我是消息我是消息我是消息2',
                    time: '2018-11-23 12:33:45',
                    userName: '王博之'
                }, {
                    id: '3',
                    content: '我是消息我是消息我是消息3',
                    time: '2018-11-23 12:33:44',
                    userName: '王安石'
                }, {
                    id: '4',
                    content: '我是消息我是消息我是消息45',
                    time: '2018-11-23 12:33:45',
                    userName: '王明'
                }]
            });
        }, 1000);
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

render(<Message />, document.getElementById('content'));
