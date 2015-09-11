# NoBS.js

Modular content management and business administration platform for small businesses and organizations.
The core solution is a boilerplate for adding custom modules and customizing existing features to fit
your needs.

## Team

  - __Product Owner__: Trevor Hanus
  - __Scrum Master__: Cody Daig
  - __Development Team Members__: Marco Viappiani, Rob Rodrigez

## Table of Contents

1. [Requirements](#requirements)
1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Requirements

- Node 0.12.x
- Postgresql 9.1.x (or other SQL database - configured locally)

## Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
```
If you need to modify some of the configs:
1.) Copy the default config file `cp lib/env/default.js lib/env/local.js`
2.) Remove any components you want don't want to set & change the options you need changed.
  * Anything in local will override the default
  * Anything not defined in local will default to the default config

## Roadmap

View the project roadmap on [GitHub Issues](https://github.com/nobsjs/nobsjs/issues).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
