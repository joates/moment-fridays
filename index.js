var Moment = require('moment')

module.exports = function(date, opts, cb) {

  var fridays = []
    , _moment = null
    , _is_now = false

  // create a moment object
  if (date) {
    _moment = Moment(date)
    if (! _moment.isValid())
      return cb(new Error('first parameter is not recognized as a valid date'))
  }
  else {
    _moment = Moment()
    _is_now = true
  }

  // input validation
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  if (!opts) opts = {}

  // validate optional settings
  opts.format = opts.format || 'YYYY-MM-DD'
  if (_moment.format(opts.format) === 'Invalid date')
    return cb(new Error('unrecognized format: '+ opts.format.toString()))

  // define a range of dates
  var start = _moment.clone().startOf('month')
    , end = _is_now ? _moment : _moment.clone().endOf('month')

  // locate 1st friday
  if (start.day() > 5) { start.add(7, 'days') }
  start.day(5)

  while(start < end) {
    fridays.push(start.format(opts.format))
    start.add(7, 'days')
  }

  // handle the case when no output exists
  if (fridays.length < 1)
    return cb(new Error('nothing found for ' +
      _moment.format(opts.format) +
      ', please try a different input date'))

  // deliver the result
  cb(null, fridays)
}

