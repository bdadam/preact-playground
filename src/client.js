import { render } from 'preact';

import foo from './home';

// const div = document.createElement('div');

render(foo, document.querySelector('#app'), document.querySelector('#app'));

// const node = document.querySelector('#app');

// node.parentNode.replaceChild(node, div);

if (module.hot) {
    require('preact/devtools');
}