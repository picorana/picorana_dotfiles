var http = require('http');
var Promise = require('promise');

callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });


  response.on('end', function () {

    var index1 = str.search('<colors>');
    var index2 = str.search('</colors>');

    str = str.substring(index1 + 8, index2);

    colors = []

    for (var i=0; i<5; i++){
        colors[i] = '#' + str.substring(i*17+5, i*17+5+6);
    }

  });
}


exports.decorateConfig = (config) => {

  var vals = ['#423238']

  var promise = new Promise(function(resolve, reject){

    http.request('http://www.colourlovers.com/api/palette/113451', function(response){

      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });


      response.on('end', function () {

        var index1 = str.search('<colors>');
        var index2 = str.search('</colors>');

        str = str.substring(index1 + 8, index2);

        vals = []

        for (var i=0; i<5; i++){
            vals[i] = '#' + str.substring(i*17+5, i*17+5+6);
        }

        resolve(vals);

      });

    }).end();

  }).then( vals => {

    return Object.assign({}, config, {
      borderColor: '#292957',
      cursorColor: '#f3c947',
      foregroundColor: vals[0],
      backgroundColor: vals[1],
      colors: [
        // Normal Colors
        vals[2], // black
        vals[3], // red
        '#57bb1e', // green
        '#ee8826', // yellow
        '#0e62d1', // blue
        '#7a6fa4', // magenta
        '#81b3a8', // cyan
        '#fae2cc', // white
        // Bright Colors
        '#6090cb', // black
        '#ff776d', // red
        '#abfb81', // green
        '#f3ca20', // yellow
        '#11a7d1', // blue
        '#ac6e65', // magenta
        '#d1faf6', // cyan
        '#f8f7fc' // white
      ],
      css: `
        ${config.css || ''}
        .tab_active:before {
          border-color: #11a7d1;
        }
      `
    });

  }, reason => {console.log(reason)});

  return Object.assign({}, config, {backgroundColor: vals[0]});

}