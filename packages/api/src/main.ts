import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/hello', (context: Koa.Context) => {
	context.body = { message: 'hello world!' };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
