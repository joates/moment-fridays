var test = require('tape')
var fridays = require('../index')

test('fridays in March 2014 (1st of month is Saturday)', function(t) {
  t.plan(3)

  // Feb 2008
  fridays('2014-03-01', function(err, data) {
    t.equal(Array.isArray(data), true, 'data is an Array')
    t.equal(data.length, 4, 'data has 4 elements')
    t.equal(data.toString(), '2014-03-07,2014-03-14,2014-03-21,2014-03-28', 'data.toString() matches')
  })
})

