var test = require('tape')
var fridays = require('../index')

test('fridays in October 1969 (before unix epoch)', function(t) {
  t.plan(3)

  // Oct 1969
  fridays('1969-10-01', function(err, data) {
    t.equal(Array.isArray(data), true, 'data is an Array')
    t.equal(data.length, 5, 'data has 5 elements')
    t.equal(data.toString(), '1969-10-03,1969-10-10,1969-10-17,1969-10-24,1969-10-31', 'data.toString() matches')
  })
})

