/** @jsx h */

import './main.scss';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import Helmet from 'preact-helmet';

import { h, render } from 'preact';

const foo = ({API}) => (
    <div class="page-container">
        <Helmet
            htmlAttributes={{ lang: "en" }}
            title="My Title"
            meta={[
                { "name": "description" , "content": "Description", "og:description": "ogdesc" }
            ]}
         />
        <Header />
        <main>
            Hello12!

            <div>{ JSON.stringify(API) }</div>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nisi expedita autem, iusto sit nihil accusamus ullam, dolorum minus, placeat id magnam tempora, ipsam numquam facere hic ut voluptas accusantium.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nisi expedita autem, iusto sit nihil accusamus ullam, dolorum minus, placeat id magnam tempora, ipsam numquam facere hic ut voluptas accusantium.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nisi expedita autem, iusto sit nihil accusamus ullam, dolorum minus, placeat id magnam tempora, ipsam numquam facere hic ut voluptas accusantium.</p>
        </main>
        <Footer/>
    </div>
);

export default foo;