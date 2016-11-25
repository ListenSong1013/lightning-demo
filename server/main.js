import Koa from 'koa';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
const port = process.env.NODE_ENV === 'production' ? 8010 : 8002;
const app = new Koa();

app.listen(port);
app.on('error', err => console.log('ERROR-->', err));
console.log(`Application ecoboost started on port: ${port}`);

if (process.send) {
    process.send('online');
}
