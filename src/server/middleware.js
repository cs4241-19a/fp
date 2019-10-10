import React from 'react';
import ReactDOM from 'react-dom/server';
import {
  Helmet
} from 'react-helmet';
import {
  StaticRouter
} from 'react-router-dom';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import App from '../client/components/App';

const HTML_TEMPLATE_PATH = path.join(__dirname, '..', 'client', 'index.html');
const HTML_TEMPLATE = fs.readFileSync(HTML_TEMPLATE_PATH, 'utf-8');

const generateHtml = markup => {
  const helmet = Helmet.renderStatic();
  const template = cheerio.load(HTML_TEMPLATE);
  const head = helmet.title.toString() + helmet.meta.toString() + helmet.link.toString();
  template('head').append(head);
  template('#app').html(markup);
  return template.html();
};

const middleware = (req, res) => {
  const context = {};
  const router = < StaticRouter location = {
    req.originalUrl
  }
  context = {
    context
  } > < App / > < /StaticRouter>;
  const markup = ReactDOM.renderToString(router);

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    const html = generateHtml(markup);
    res.send(html);
  }
};

export default middleware;