const Controller = require('egg').Controller;


module.exports = class WechatpivotController extends Controller {
  async index() {
    const { ctx } = this;
    const { code } = ctx.query;
    const nextPage = `/${ctx.params[0]}`;

    // TODO: RequestParam required
    if (!code || !nextPage) {
      ctx.status = 422;
      return;
    }

    const { openId } = await ctx.service.wechatpivot.getWechatUserByCode(code);
    ctx.session.openId = openId;

    const user = await ctx.service.user.showByOpenId(openId);
    if (user.userId) {
      ctx.session.userId = user.userId;
    }

    return ctx.redirect(nextPage);
  }
}
