module.exports = app => {
  class ViewController extends app.Controller {
    async index() {
      const { ctx } = this;

      // ctx.logger.debug('Hello Debug');
      ctx.logger.info('Hello Info');
      // ctx.logger.warn('Hello Warn');
      // ctx.logger.error('Hello Error');

      // const e = new TypeError('type-error-demo', 'view.js', 11);
      // ctx.logger.error(e);

      ctx.logger.info('Hello Format %j', { name: 'albert' });
      ctx.service.foo.bar();

      ctx.status = 200;
      ctx.body = {
        code: 0,
        message: 'egg-mq ok',
      };
    }
  }

  return ViewController;
};
