/** @jsx h */

import './main.scss';


import Header from './components/Header';
import Footer from './components/Footer';

import { h, render, Component } from 'preact';

const click = () => {
    // console.log('qwe');
};

const foo = () => (
    <div class="page-container" onclick={click}>
        <Header />
        <main>
            Hello12!
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nisi expedita autem, iusto sit nihil accusamus ullam, dolorum minus, placeat id magnam tempora, ipsam numquam facere hic ut voluptas accusantium.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nisi expedita autem, iusto sit nihil accusamus ullam, dolorum minus, placeat id magnam tempora, ipsam numquam facere hic ut voluptas accusantium.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nisi expedita autem, iusto sit nihil accusamus ullam, dolorum minus, placeat id magnam tempora, ipsam numquam facere hic ut voluptas accusantium.</p>
        </main>
        <Footer/>
    </div>
);

export default foo;