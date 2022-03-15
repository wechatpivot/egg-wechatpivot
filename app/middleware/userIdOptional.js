module.exports = options => {
  return async function userIdOptional(ctx, next) {
    const { openId } = ctx.session;
    if (openId) {
      const user = ctx.service.user.loginByOpenId(openId);
      if (user.userId) {
        ctx.session.userId = user.userId;
      }
      await next();
    } else {
      await next();
    }
  }
};
