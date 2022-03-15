const Transport = require('egg-logger').Transport;
const Logger = require('le_node');


let logger = null;


class LogentriesTransport extends Transport {
  log(level, args, meta) {
    if (!meta) { // FIXME: egg-sequelize
      return;
    }

    const { date, hostname } = meta;
    const { app: { name, config: { env, cluster: { listen: { port } }, props } } } = this.options;

    const datetime = date ? date.replace(',', '.') : '';
    const machine = `${name}|${hostname}|${port}`;
    const [ linenoKey ] = Object.keys(args).sort().slice(-1);
    const lineno = args[linenoKey];

    function formatter({ level, date, pid, message }) {
      return `${datetime} [${machine}] [${pid}] ${lineno} [${level}] - ${message.replace(lineno, '')}`;
    }

    const message = super.log(level, args, { ...meta, formatter });
    // console.log(message);
    // console.log(meta);
    // console.log(this.options);

    // console.log(name);
    // console.log(config);
    // console.log(config.env);
    // console.log(config.props);
    // console.log(config.cluster.listen.port);

    if (env === 'local') {
      return;
    }

    if (!logger) {
      logger = new Logger({
        token: props['logentries.token'],
      });
      logger.warn = logger.warning;
      logger.error = logger.err;
    }

    const lvl = level.toLowerCase();
    if (logger[lvl]) {
      logger[lvl](message);
    } else {
      logger.info(message);
    }
  }
}


module.exports = LogentriesTransport;
