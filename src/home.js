/** @jsx h */

import './test1.scss';
import './test2.scss';

import { h, render } from 'preact';

const click = () => console.log('qwe');

const foo = <div id="foo" onclick={ click }>Hello12!</div>;

export default foo;