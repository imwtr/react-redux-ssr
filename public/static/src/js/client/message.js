import React, {Component} from 'react';
import {render, hydrate, findDOMNode} from 'react-dom';
import Message from '../common/message';

{/*render(<Message />, document.getElementById('content'));*/}
hydrate(<Message />, document.getElementById('content'));
