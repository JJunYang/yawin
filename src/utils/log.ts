import colors from 'colors';

class Logger {
  constructor() {}

  public success(...args: any[]) {
    const str = args.join(',');
    console.log(colors.green('[SUCCESS]') + `${str}`);
  }

  public info(...args: any[]) {
    const str = args.join(',');
    console.log(colors.blue('[INFO]') + `${str}`);
  }

  public warn(...args: any[]) {
    const str = args.join(',');
    console.log(colors.magenta('[WARN]') + `${str}`);
  }

  public error(...args: any[]) {
    const str = args.join(',');
    console.log(colors.red('[ERROR]') + `${str}`);
  }
}

const logger = new Logger();
export default logger;

/**
 *
 * @param msg log信息
 * @param code 进程退出码, 0表示正常退出，1表示以非零状态退出，通常发生某种错误
 */
export const logAndExit = (msg: string, code = 0) => {
  if (code === 0) {
    logger.success(msg);
  } else {
    logger.error(msg);
  }
  logger.info('进程即将退出...');
  process.exit(code);
};
