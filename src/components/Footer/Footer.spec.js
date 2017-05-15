import { h } from 'preact';
import render from 'preact-render-to-string';

import Footer from './Footer';

describe('Footer', () => {

    it('has link to legal notes', () => {
        const footer = render(<Footer/>);
        const linkToLegalNotes = render(<a href="/">Legal notes</a>);
        expect(footer).toContain(linkToLegalNotes);
    });

    it('matches snapshot', () => {
        const footerTree = render(<Footer/>);
        expect(footerTree).toMatchSnapshot();
    });
});