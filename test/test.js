var test = require('tape')
  , concat = require('concat-stream')
  , flo_mom = require('../index')
  , fixture = '2008-02-29\n2008-02-22\n2008-02-15\n2008-02-08\n2008-02-01\n'
  , t_count = 0

test('February 2008 has 5 fridays (cli)', function(t) {
  t.plan(1)

  var t_out = concat({ encoding: 'string' }, function(t_stream) {
  //t.equal(t_count, 1, 'correct number of chunks emitted')
    t.equal(t_stream, fixture, 'stdout matches fixture')
    t.end()
  })

  var args = [ __dirname+'/../index.js',      '2008-02-29',
               '--limit=5',  '--startDay=5',  '--stride=7' ]
    , spawn = require('child_process').spawn
    , child = spawn('node', args)

  child.stdout.on('data', function(chunk) {
    t_count++
    t_out.write(chunk)
  })

  child.stdout.on('end', function(chunk) {
    if (chunk) {
      t_count++
      t_out.write(chunk)
    }
    t_out.end()
  })
})

test('February 2008 has 5 fridays (module)', function(t) {
  t.plan(2)
  t_count = 0

  var t_out = concat({ encoding: 'string' }, function(t_stream) {
    t.equal(t_count, 5, 'correct number of chunks emitted')
    t.equal(t_stream, fixture, 'stdout matches fixture')
    t.end()
  })

  var opts = { limit:5, startDay:5, stride:7 }
  flo_mom('2008-02-29', opts, function(err, stream) {

    stream.on('data', function(chunk) {
      t_count++
      t_out.write(chunk)
    })

    stream.on('error', function() {
      t_out.end()
    })

    stream.on('end', function(chunk) {
      if (chunk) {
        t_count++
        t_out.write(chunk)
      }
      t_out.end()
    })
  })
})
