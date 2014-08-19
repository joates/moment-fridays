var test = require('tape')
var fridays = require('../index')

test('fridays in February 2008 (a leap year)', function(t) {
  t.plan(3)

  // Feb 2008
  fridays('2008-02-01', function(err, data) {
    t.equal(Array.isArray(data), true, 'data is an Array')
    t.equal(data.length, 5, 'data has 5 elements')
    t.equal(data.toString(), '2008-02-01,2008-02-08,2008-02-15,2008-02-22,2008-02-29', 'data.toString() matches')
  })
})

