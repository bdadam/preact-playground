/** @jsx h */

import { h, render } from 'preact';

import Application from './Application';

import API from './api/api-client';

const appContainer = document.createElement('div');
// document.body.appendChild(appContainer);

const serverRenderedAppContainer = document.querySelector('#app');

// render(<Foo/>, appContainer);
render(<Application API={API}/>, document.body);
serverRenderedAppContainer.remove();
// const x = render(<Foo/>, serverRenderedAppContainer);

// serverRenderedAppContainer.parentNode.replaceChild(appContainer, serverRenderedAppContainer);

// serverRenderedAppContainer.parentNode.replaceChild(appContainer, serverRenderedAppContainer);


// render(foo, document.querySelector('#app'), document.querySelector('#app'));
// render(foo, document.querySelector('#app'));
// render(Home, appContainer);

// const serverRenderedAppContainer = document.querySelector('#app');

// serverRenderedAppContainer.parentNode.replaceChild(serverRenderedAppContainer, appContainer);

if (module.hot) {
    require('preact/devtools');
}