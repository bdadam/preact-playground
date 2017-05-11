/** @jsx h */

import classnames from 'classnames';

import { h, Component } from 'preact';

import './Header.scss';

export default class Header extends Component {

    constructor() {
        super();
        this.state.open = false;
    }
    
    render(props, state) {

        return (
            <header class={classnames({"site-header": true, "site-header--open": state.open})}>
                <div class="site-header__header-bar">
                    <button class="site-header__menu-toggle" onClick={this.toggleMenu.bind(this)}>Menu</button>
                    Site Header
                </div>
                <nav class="site-header__nav">
                    <a href="/">Home</a>
                    <a href="/">About</a>
                </nav>
                { "asdfg///xxyyaabbccddeeffgghhiijjkkllmmnnOOppqqrrssttuuvvwwxxyyzz11223344556677889900" }
            </header>
        );
    }

    toggleMenu(a,b) {
        const oldState = this.state.open;
        this.setState({ open: !oldState });
        console.log(this.state.open);
    }
}