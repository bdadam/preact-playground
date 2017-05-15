/** @jsx h */

import classnames from 'classnames';

import { h, Component } from 'preact';

import './Header.scss';

const menuItems = [
    { title: 'Home Title', href: '', text: 'Home' },
    { title: 'About Title', href: '', text: 'About' },
    { title: 'Yaaayy Title', href: '', text: 'Yaaayy' },
];

const cls = { asdf: true, qwertt: 0 };

const Header = ({open, onToggle}) => {
    return (
        <header class={classnames("site-header", { "site-header--open": open })}>
            <div class="site-header__header-bar">
                <button class="site-header__menu-toggle" onClick={onToggle}>Menu</button>
                Site Header
            </div>
            <nav class="site-header__nav">
                { menuItems.map(item => (<a href={item.href} title={item.title}>{item.text}</a>)) }
            </nav>
        </header>
    );
};

export default class extends Component {
    constructor() {
        super();
        this.state.open = false;
    }

    render() {
        return <Header open={this.state.open} onToggle={this.toggle.bind(this)}/>;
    }

    toggle() {
        this.setState({ open: !this.state.open });
    }
}