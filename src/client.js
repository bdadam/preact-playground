import { render } from 'preact';

import foo from './home';

const div = document.createElement('div');

render(foo, div);

const node = document.querySelector('#app');

node.parentNode.replaceChild(node, div);

if (module.hot) {
    require('preact/devtools');
}