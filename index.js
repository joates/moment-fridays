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
    , limit = opts.limit || 2
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
    cb(new Error('unrecognized format: '+ format))

  rs._read = function() {
    if (_date < hardLimit || ! flowing && ! limit--) return rs.push(null)
    rs.push(_date.format(format) +'\n')
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
      '\n  -f, --format=    a string describing the output format of dates'+
      '\n  -l, --limit=     count of how many previous fridays to display'+
      '\n'+
      '\n      --help       display this help and exit'+
      '\n      --version    display version information and exit'+
      '\n';

    console.log(usage)
    process.exit()
  }

  function version() {
    console.log(require("./package.json").version)
    process.exit()
  }

  var _args = process.argv.slice(2)
    , _opts = {string: 'f', alias: {f: 'format', l: 'limit'} }
    , argv = require('minimist')(_args, _opts)
    , date = argv._[0] || null
    , opts = {}

  if (argv.format) opts.format = argv.format
  if (argv.limit) opts.limit = 0 + argv.limit
  if (argv.help) usage()
  if (argv.version) version()

  main(date, opts, function(err, data) {
    if (err) throw err
    process.stdout.on('error', process.exit)
    data.pipe(process.stdout)
  })
}

