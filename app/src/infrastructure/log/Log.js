/**
 * A simple console logger.
 * Replace with your own, if desired.
 */
class Log {
  constructor ({ name }) {
    this.name = name
    this.logName = `[${name}]:`
  }

  debug(...args) {
    console.debug(this.logName, ...args)
  }

  info(...args) {
    console.info(this.logName, ...args)
  }

  log(...args) {
    console.log(this.logName, ...args)
  }

  warn(...args) {
    console.warn(this.logName, ...args)
  }

  error(...args) {
    console.error(this.logName, ...args)
  }
}

/**
 * Creates a new logger.
 * @param name {string} the name of the context to log
 * @return {Log} the log instance
 */
export const createLog = ({ name }) => new Log({ name })
