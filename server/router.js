import fs from 'fs';
import path from 'path';
// const koaRouter = require('koa-router')();

export default {
    init: (app) => {
        // app
        // .use(koaRouter.routes())
        // .use(koaRouter.allowedMethods());

        app.use(async function (ctx, next) {

            try {
                 //Reload './webpack-stats.json' on dev
                let assets;
                if (process.env.NODE_ENV === 'development') {
                    assets = fs.readFileSync(path.resolve(__dirname, './webpack-stats.json'));
                    assets = JSON.parse(assets);
                } else {
                    assets = require('./webpack-stats.json');
                }

                return await ctx.render('main', {
                    layout: false,
                    assets
                });
            } catch (error) {
                if (error.redirect) {
                    return ctx.redirect(error.redirect);
                }
                throw error;
            }
        });
    }
}
