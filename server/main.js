import Koa from 'koa';
import R from './router';
import M from './middleware';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
const port = process.env.NODE_ENV === 'production' ? 8010 : 8002;
const app = new Koa();

M.init(app);
R.init(app);

app.listen(port);
app.on('error', err => console.log('ERROR-->', err));
console.log(`Application ecoboost started on port: ${port}`);

if (process.send) {
    process.send('online');
}
