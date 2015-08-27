# TropicalBS

Modular content management and business administration platform for small businesses and organizations.
Core product enables management of public content, customers, scheduling, and billing.
Incremental modules will allow TropicalBS to be customized for specific use cases, such as dance/karate/yoga studios, recreational sports leagues, etc.

## Team

  - __Product Owner__: Trevor Hanus
  - __Scrum Master__: Cody Daig
  - __Development Team Members__: Marco Viappiani, Rob Rodrigez

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.12.x
- Postgresql 9.1.x (or other SQL database - configured locally)

## Development

### Installing Dependencies

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

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
