requirejs.config({
  baseUrl: 'scripts/tetris',
  paths: {
    'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery',
    'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash'
  }
/*
    makes module.config().test available in canvas module,
    assuming module is added as a dependency.
    Can't be used to pass a global configuration variable.
    See: http://requirejs.org/docs/api.html#config-moduleconfig

  config: {
      'utility/canvas': {
          test: true
      }
  }
*/
});

requirejs(['../game']);
