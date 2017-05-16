import { h } from 'preact';
import render from 'preact-render-to-string';
import htmlLooksLike from 'html-looks-like';

import Header from './Header';

describe('Site Header', () => {

    it('looks like', () => {
        const actual = render(<Header />);
        const expected = `
            <header class="site-header">
                <div class="site-header__header-bar">
                    <button class="site-header__menu-toggle">Menu</button>
                    Site Header
                </div>
                <nav class="site-header__nav">
                    {{ ... }}
                </nav>
            </header>`;

        htmlLooksLike(actual, expected);
    });

    it('matches snapshot', () => {
        const tree = render(<Header />);
        expect(tree).toMatchSnapshot();
    });

    it('opens on button click', () => {
        const header = new Header();

        expect(header.state.open).toBe(false);
        header.toggle();
        expect(header.state.open).toBe(true);
        header.toggle();
        expect(header.state.open).toBe(false);
    });
});