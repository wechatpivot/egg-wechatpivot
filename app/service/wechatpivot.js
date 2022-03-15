const Service = require('egg').Service;


module.exports = class WechatPivot extends Service {
  async getUrl(page) {
    const { ctx, service } = this;
    const command = { r: service.locationUtils.getAppUrl(`/wechat-login${page}`) };
    const { url } = await ctx.service.httpClient.doPost(ctx.discovery.wechatpivot + '/private-api/oauth/snsapi-base:url', command);
    return url;
  }

  async getWechatUserByCode(code) {
    const { ctx } = this;
    const data = await ctx.service.httpClient.doGet(ctx.discovery.wechatpivot + `/private-api/oauth/snsapi-base?code=${code}`);
    return data;
  }

  async getJssdkConfig() {
    const { ctx } = this;
    const href = ctx.service.locationUtils.getHref();
    const data = await ctx.service.httpClient.doGet(ctx.discovery.wechatpivot + `/private-api/jssdk/config?url=${encodeURIComponent(href)}`);
    return data;
  }

  async createJsapiOrder(openId, orderNo, skuCode, price, description) {
    const { ctx, config } = this;

    const command = {
      openId,
      orderNo,
      productCode: skuCode,
      price,
      description,
    };
    // ctx.logger.info(command);

    const api = ctx.discovery.wechatpivot + '/private-api/create-jsapi-order';

    const data = await ctx.service.httpClient.doPost(api, command);
    // ctx.logger.info(data);

    return data;
  }
};
