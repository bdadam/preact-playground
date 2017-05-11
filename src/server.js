/** @jsx h */

import path from 'path';

import express from 'express';
import { h } from 'preact';
import render from 'preact-render-to-string';
import Application from './Application';

import Helmet from 'preact-helmet'

import API from './api/api-server';

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

// if (process.env.NODE_ENV !== 'production') {
// 	app.use('/static', webpackDevMiddleware(compiler, {
// 		stats: {
// 			children: false,
// 			chunks: false,
// 			colors: true
// 		},
// 		lazy: true,
// 		serverSideRender: true
// 	}));
// } else {
	app.use('/static', express.static('dist'));
// }

const Html = ({head}) => {
	const attrs = head.htmlAttributes.toComponent();

	return (
		<html {...attrs}>
		<head>
			<meta charset="utf-8"/>
			{head.title.toComponent()}
			{head.meta.toComponent()}
			{head.link.toComponent()}
			<link rel="stylesheet" href="/static/main.css"/>
		</head>
		<body>
			<div id="app" class="server-rendered"><Application API={API}/></div>
			<script src="/static/main.min.js" defer></script>
		</body>
		</html>
	);
};

app.get('/', (req, res) => {
	console.log('qwer222255555');
	// const html = render(<Application API={API}/>);
	const head = Helmet.rewind();
	const html = render(<Html head={head}/>);
	res.send(html);

	// res.send(`
    //     <!DOCTYPE html>
    //     <html ${head.htmlAttributes.toString()}>
    //         <head>
	// 			<meta charset="utf-8">
	// 			${head.title.toString()}
	// 			${head.meta.toString()}
	// 			${head.link.toString()}
	// 			<link rel="stylesheet" href="/static/main.css">
	// 		</head>
	// 		<body>
	// 			<div id="app" class="server-rendered">${html}</div>
	// 			<script src="/static/main.min.js" defer></script>
	// 		</body>
	// 	</html>
	// `);
});



app.get('/:fox', (req, res) => {
	let html = render(<Fox name={req.params.fox} />);
	res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
});

export default app;
// export default (...args) => {

// 	Object.keys(require.cache).filter(x => x.indexOf('node_modules') < 0).forEach(console.log.bind(console))

// 	const w = require('path').resolve(path.join(__dirname, __filename));
// 	console.log('called', w);

// 	// delete require.cache['/home/adam/Projects/preact-playground/src/server.js'];
// 	// console.log(require.cache[w])
// 	Object.keys(require.cache).filter(x => !x.includes('node_modules') && !x.includes('.scss')).forEach(function (key) { delete require.cache[key] });
// 	app(...args);
// }