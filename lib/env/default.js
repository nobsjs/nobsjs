module.exports = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL, // Optional. If set, ignores the remaining values.
    host: 'localhost',
    dialect: 'postgres',
    database: 'tropicalbs',
    username: '',
    password: ''
  },
  databaseTest: {
    url: process.env.DATABASE_URL, // Optional. If set, ignores the remaining values.
    host: 'localhost',
    dialect: 'postgres',
    database: 'circle_test',
    username: 'ubuntu',
    password: '' 
  },
  assets: {
    client: {
      lib: {
        js: [
          'public/lib/angular/angular.min.js',
          'public/lib/angular-ui-router/release/angular-ui-router.min.js',
          // TODO: angular-mocks might need to be taken out eventually (and need to check dependencies in Angular apps in that case)
          'public/lib/angular-mocks/angular-mocks.js'
        ],
        css: []
      },
      js: ['modules/*/client/**/*.js'],
      css: [],
      tests: ['modules/*/tests/client/**/*.js']
    },
    server: {
      models: ['modules/*/server/models/**/*.js'],
      routes: ['modules/*/server/routes/**/*.js'],
      tests: ['modules/*/tests/server/**/*.js']
    }
  },
  locals: {
    title: 'Tropical Submarine'
  }
};
