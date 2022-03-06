const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()} [${label}] : ${message}`;
});

var getLabel = function (callingModule) {
    var parts = callingModule.filename.split('/');
    return parts[parts.length - 2] + '/' + parts.pop();
};

module.exports = function(callingModule) {
    return createLogger({
        format: combine(
          label({ label: getLabel(callingModule) }),
          timestamp(),
          myFormat
        ),
        transports: [new transports.Console()]
      })
};
