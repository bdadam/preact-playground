/** @jsx h */

import path from 'path';

import express from 'express';
import { h } from 'preact';
import render from 'preact-render-to-string';
import foo from './home';

const Fox = ({ name }) => (
	<div class="fox">
		<h5>{name}</h5>
		<p>This page is all about {name}.</p>
	</div>
);

const app = express();

app.use('/static', express.static('dist'));

app.get('/', (req, res) => {
	const html = render(foo);
	res.send(`
        <!DOCTYPE html>
        <html>
            <head>
				<title>Title server rendered</title>
				<link rel="stylesheet" href="/static/main.css">
			</head>
			<body>
				<div id="app">${html}</div>
				<script src="/static/main.min.js"></script>
			</body>
		</html>
	`);
});

app.get('/:fox', (req, res) => {
	let html = render(<Fox name={req.params.fox} />);
	res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
});

export default app;