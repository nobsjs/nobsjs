module.exports = {
  port: 4000,
  assets: {
    client: {
      lib: {
        js: [
          'public/lib/angular/angular.min.js',
          'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        ],
        css: []
      },
      js: ['modules/*/client/**/*.js'],
      css: [],
      tests: ['modules/*/tests/client/**/*.js']
    },
    server: {
      routes: ['modules/*/server/routes/**/*.js'],
      tests: ['modules/*/tests/server/**/*.js']
    }
  },
  locals: {
    title: 'Tropical Submarine'
  }
};
