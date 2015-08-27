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
  log: {
    //disables logging for the database (default is console.log)
    db: false
  },
  assets: {
    client: {
      lib: {
        js: [
          'public/lib/angular/angular.min.js',
          'public/lib/angular-aria/angular-aria.js',
          'public/lib/angular-animate/angular-animate.min.js',
          'public/lib/angular-material/angular-material.min.js',
          'public/lib/angular-ui-router/release/angular-ui-router.min.js'
          // TODO: angular-mocks might need to be taken out eventually (and need to check dependencies in Angular apps in that case)
        ],
        css: ['public/lib/angular-material/angular-material.css']
      },
      js: ['modules/core/client/**/*.js', 'modules/!(core)/client/**/*.js'],
      css: ['modules/*/client/**/*.css'],
      tests: ['public/lib/angular-mocks/angular-mocks.js', 'modules/*/tests/client/**/*.js']
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
