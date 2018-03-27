fs = require('fs')
os = require('os')


exports.decorateConfig = (config) => {

  col_read = fs.readFileSync(os.homedir()+"/.hyper_plugins/local/hyper-colour-lovers/colors").toString().split('\n');

  return Object.assign({}, config, {
    borderColor: '#292957',
    cursorColor: '#f3c947',
    foregroundColor: '#57bb1e',
    backgroundColor: col_read[0],
    colors: col_read,
    css: `
      ${config.css || ''}
      .tab_active:before {
        border-color: #11a7d1;
      }
    `
  });

}