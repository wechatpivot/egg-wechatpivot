const urlparse = require('url').parse;


module.exports = options => {
  return async function openIdRequired(ctx, next) {
    const { openId } = ctx.session;
    if (!openId) {
        const page = urlparse(ctx.request.url).pathname;
        const url = await ctx.service.wechatpivot.getUrl(page);
        return ctx.redirect(url);
      } else {
        await next();
      }
  }
};
