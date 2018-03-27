exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    borderColor: '#292957',
    cursorColor: '#f3c947',
    foregroundColor: '#ffffff',
    backgroundColor: '#000000',
    colors: [
      '#f8f7fc' // white
    ],
    css: `
      ${config.css || ''}
      .tab_active:before {
        border-color: #11a7d1;
      }
    `
  });
}