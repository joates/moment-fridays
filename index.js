var Moment = require('moment')
  , Readable = require('stream').Readable
  , rs = Readable()

var main = module.exports = function(date, opts, cb) {

  var _date

  if (! date) date = Date.now()
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  if (! opts) opts = {}

  var flowing = ! opts.limit
    , limit = parseInt(opts.limit, 10) || 1
    , hardLimit = Moment('1888-06-01')

  try {
    _date = Moment(date)
    if (! _date.isValid())
      throw new Error('Invalid date')
  }
  catch(e) {
    _date = Moment()
  }

  if (_date.day() < 5)
    _date.subtract(7, 'days')

  _date.day(5)

  var format = opts.format || 'YYYY-MM-DD'
  if (_date.format(format) === 'Invalid date')
    throw new Error('unrecognized format: '+ format)

  rs._read = function() {
    rs.push(_date.format(format) +'\n')
    if (_date < hardLimit || ! flowing && limit-- < 0) process.exit()
    _date.subtract(7, 'days')
  }

  cb(null, rs)
}


if (! module.parent) {
  function usage() {
    var usage = 'Usage: node index.js [DATE] [OPTIONS]'+
      '\nDisplay a continuous stream of friday dates occuring before DATE.'+
      '\nIf DATE is omitted the friday before the current date is used.'+
      '\n'+
      '\nOptions:'+
      '\n  -l, --limit=     count of how many previous fridays to display'+
      '\n      --format=    a string describing the output format of dates'+
      '\n'+
      '\n      --help       display this help and exit'+
      '\n      --version    display version information and exit'+
      '\n';

    console.log(usage)
    process.exit()
  }

  var argv = require('minimist')(process.argv.slice(2))
    , opts = {}

  if (argv.l) opts.limit = parseInt(argv.l, 10)
  if (argv.limit) opts.limit = parseInt(argv.limit, 10)
  if (argv.format) opts.format = argv.format
  if (argv.help) usage()
  if (argv.version) {
    console.log(require("./package.json").version)
    process.exit()
  }

  main(argv._[0], opts, function(err, data) {
    if (err) console.error(err.message, err)

    process.on('exit', function() { /*console.log('\n')*/ })
    process.stdout.on('error', process.exit)

    data.pipe(process.stdout)
  })
}

