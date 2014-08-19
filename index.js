var Moment = require('moment')

module.exports = function(date, opts, cb) {

  var _moment = null
    , date_is_now = false

  // input validation
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  if (!opts) opts = {}
  opts.format = opts.format || 'YYYY-MM-DD'

  // create a moment object and check that it is valid
  if (date) {
    _moment = Moment(date)
    if (! _moment.isValid())
      return cb(new Error('first parameter is not recognized as a valid date'))
  }
  else {
    _moment = Moment()
    date_is_now = true
  }

  // validate optional settings
  if (_moment.format(opts.format) === 'Invalid date')
    return cb(new Error('unrecognized format: '+ opts.format.toString()))

  // calculate return value
  var fridays = []
    , start = _moment.clone().startOf('month').day(5)
    , end = date_is_now ? _moment : _moment.clone().endOf('month')

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

