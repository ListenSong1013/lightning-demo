const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const compressor = require('koa-compressor');
const convert = require('koa-convert')

import co from 'co';
import render from'koa-ejs';
import path from 'path';
import proxy from 'koa-proxy';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import staticCache from 'koa-static-cache';
import responseTime from 'koa-response-time';

const env = process.env.NODE_ENV || 'development';

export default {
    init: (app) => {
        // ejs tpl
        render(app, {
            root: path.join(__dirname, './views'),
            layout: 'layout',
            viewExt: 'html',
            cache: false,
            debug: true
        });
        app.context.render = co.wrap(app.context.render);

        // add header `X-Response-Time`
        app.use(convert(responseTime()));

        // add log
        app.use(convert(logger()));

        // various security headers
        app.use(convert(helmet()));

        if (env === 'production') {
            app.use(convert(conditional()));
            app.use(convert(etag()));
            app.use(convert(compressor()));
        }

        // static
        app.use(convert(mount('/public', staticCache(path.join(__dirname, '../public'), {}))));

        // dist 目录,开发和正式环境都需要
        if (env === 'development') {
            // Proxy asset folder to webpack development server in development mode
            // 使用环境变量来减少依赖
            let HOST = process.env.MEIQIA_NODE_DEV_HOSTNAME;
            let PORT = process.env.MEIQIA_NODE_DEV_PORT;
            app.use(convert(proxy({
                host: `http://${HOST}:${PORT}`,
                match: /^\/assets\//
            })));
        } else {
            app.use(convert(mount('/assets', staticCache(path.join(__dirname, '../dist'), {}))));
        }
    }
};
