## moment-fridays
![moment-fridays-logo](https://raw.github.com/joates/moment-fridays/master/img/moment-fridays-logo.png)


### FYI

[flowing-moments](https://github.com/joates/flowing-moments) has the exact same functionality as this code, _plus_ additional configuration options (_i.e._ days other than fridays ;-)


### Installation

`npm install moment-fridays`



### API

use as a module..
```javascript
var fridays = require('moment-fridays')

// > use the defaults:
// fridays('', {}, cb)		

// > specify a date that moment can parse:
// fridays(any_valid_date, cb)		

// > opts are optional,
// > cb can be 2nd or 3rd parameter:
// fridays(Date.now(), opts || {}, cb)	

var opts = { format: 'dddd Do MMM YYYY' }
fridays('2010-12-25', opts, function(err, data) {
  if (err) throw err
  data.pipe(process.stdout)	// streaming data
})
```

_or from the command line.._
```javascript
node index.js --format='dddd Do, MMM YYYY' -l5 '2008-02-29'

//output is:
Friday 29th, Feb 2008
Friday 22nd, Feb 2008
Friday 15th, Feb 2008
Friday 8th, Feb 2008
Friday 1st, Feb 2008
```

_its easy to get the previous four fridays:_
```shell
node index.js |head -n4
```


### Documentation

see the [Moment.js docs](http://momentjs.com/docs/#/displaying/format/) for different ways of formatting the date output


### (_in_)accuracy

There is an issue with accuracy when using ```date.subtract(n, 'days')```, which is discussed in this [issue](https://github.com/moment/moment/issues/961). A ```hardLimit``` has been implemented [here](https://github.com/joates/moment-fridays/blob/master/index.js#L40) to avoid dates earlier than _June 1888_, this is NOT the point at which the bug appears, it is just an arbitrary limit because for this use case i am not interested in dates older than this.


### License

MIT
