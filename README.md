## moment-fridays
![moment-fridays-logo](https://raw.github.com/joates/moment-fridays/master/img/moment-fridays-logo.png)

### Installation

`npm install moment-fridays`



### API

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
fridays('Dec 25, 2010', opts, function(err, data) {
  if (err) throw err
  console.dir(data)		// data is an array
})
```



### Documentation

see the [Moment.js docs](http://momentjs.com/docs/#/displaying/format/) for different ways of formatting the date output



### License

MIT
