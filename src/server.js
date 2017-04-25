/** @jsx h */

import path from 'path';

import express from 'express';
import { h } from 'preact';
import render from 'preact-render-to-string';
import Foo from './home';

const Fox = ({ name }) => (
	<div class="fox">
		<h5>{name}</h5>
		<p>This page is all about {name}.</p>
	</div>
);

const app = express();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV !== 'production') {
	app.use('/static', webpackDevMiddleware(compiler, {
		stats: {
			children: false,
			chunks: false,
			colors: true
		}
	}));
} else {
	app.use('/static', express.static('dist'));
}

app.get('/', (req, res) => {
	const html = render(<Foo/>);
	res.send(`
        <!DOCTYPE html>
        <html>
            <head>
				<title>Title server rendered</title>
				<link rel="stylesheet" href="/static/main.css">
			</head>
			<body>
				<div id="app" class="server-rendered">${html}</div>
				<script src="/static/main.min.js" defer></script>
			</body>
		</html>
	`);
});

app.get('/:fox', (req, res) => {
	let html = render(<Fox name={req.params.fox} />);
	res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
});

export default app;