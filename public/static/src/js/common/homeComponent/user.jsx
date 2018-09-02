import React, {Component} from 'react';
import {render, findDOMNode} from 'react-dom';

/**
 * 用户信息
 */
class User extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        if (!this.props.name) {
            return <div className="user-info"></div>;
        }

        return (
            <div className="user-info">
                <img className="user-info__avatar" title="头像" alt="头像" src={this.props.avatar} width="60" height="60" />
                <p>
                    <span>{this.props.name}</span>&emsp;|&emsp;
                    <span>{this.props.age}岁</span>&emsp;|&emsp;
                    <span>{this.props.sex === 'male' ? '男' : '女'}</span>
                </p>
            </div>
        )
    }
}

export default User;
