'use strict';

const camelCase = require('camelcase');
const R = require('ramda');
const DOMParser = require('dom-parser');
const http = require('http');
const writeFileSync = require('fs').writeFileSync;
const shortHandMap = {
  'bg-color': 'backgroundColor',
  'fg-color': 'foregroundColor',
  'term-css': 'term-CSS'
}

var callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });


  response.on('end', function () {

    var colors = [];
    var parser = new DOMParser();
    var res = parser.parseFromString(str, 'text/xml');
    var color_list = res.getElementsByTagName("hex");

    for (var i=0; i<color_list.length*3; i++){
      colors[i] = "#" + color_list[i%color_list.length].innerHTML;
    }

    for (var i=0; i<colors.length; i++){
      console.log(colors[i]);
    }

    var val = colors;

    setColors(colors);
    setBackground(colors[0]);
  });
}

let hyperTermconfig, configPath;

const requireConfig = hyperTermconfigPath => {
  configPath = require('expand-tilde')(hyperTermconfigPath || '~/.hyper.js');
  try {
    hyperTermconfig = require(configPath);
  } catch(e) {
    console.error('Could not find `~/.hyper.js`, please make sure you have installed hyperterm!');
    process.exit(-1);
  }
}

const getConfigAtttr = prop => {
  var confLens = R.lensProp(shortHandMap[prop] || camelCase(prop));
  return R.view(confLens, hyperTermconfig.config) ||
         R.view(confLens, hyperTermconfig) ||
         unknownProp(prop);
}

const setColors = (val) => {
  var prop = 'colors';
  var confLens = R.lensProp(shortHandMap[prop] || camelCase(prop));
  if( R.view(confLens, hyperTermconfig.config)){
    hyperTermconfig.config = R.set(confLens, val, hyperTermconfig.config);
  } else if (R.view(confLens, hyperTermconfig)){
    hyperTermconfig = R.set(confLens, val, hyperTermconfig);
  } else {
    console.log(unknownProp(prop));
  }

  writeFileSync(configPath,`module.exports=${JSON.stringify(hyperTermconfig, null, 2)}`, {encoding:'utf-8'});
}

const setBackground = (val) => {
  var prop = 'backgroundColor';
  var confLens = R.lensProp(shortHandMap[prop] || camelCase(prop));
  if( R.view(confLens, hyperTermconfig.config)){
    hyperTermconfig.config = R.set(confLens, val, hyperTermconfig.config);
  } else if (R.view(confLens, hyperTermconfig)){
    hyperTermconfig = R.set(confLens, val, hyperTermconfig);
  } else {
    console.log(unknownProp(prop));
  }

  writeFileSync(configPath,`module.exports=${JSON.stringify(hyperTermconfig, null, 2)}`, {encoding:'utf-8'});
}

const setConfigAttr = (param,val) => {
  if (param == 'palette'){
    try {
      http.request('http://www.colourlovers.com/api/palette/' + val, callback).end();
    } catch (err){
      console.log(err);
    }
  }
}

const unknownProp = prop => `Undefined property: ${prop} check --help`;

const getVal = (prop) => getConfigAtttr(prop);

const setVal = (prop, val) => setConfigAttr(prop, val);


module.exports = hyperTermconfigPath => {
  requireConfig(hyperTermconfigPath);
  return {
    get: (prop) => {
      return getVal(prop);
    },
    set: (prop, val) => {
      return setVal(prop, val);
    }
  }
}