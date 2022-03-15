const LOCAL = Symbol('context#local');


module.exports = {
  get local() {
    if (!this[LOCAL]) {
      const { p_u: uid = '', p_s: sid = '', p_l: lang = 'zh' } = this.query;
      this[LOCAL] = { uid, sid, lang };
    }
    return this[LOCAL];
  },

  set local(payload) {
    this[LOCAL] = Object.assign({}, this[LOCAL], payload);
  }
};
