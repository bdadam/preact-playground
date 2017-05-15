/** @jsx h */

import './Footer.scss';

import { h, Component } from 'preact';

export default () => {
    return (
        <footer class="site-footer">
            &copy; 2017
            &nbsp;
            <a href="/">Legal notes</a>
        </footer>
    );
};