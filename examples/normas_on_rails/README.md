# Normas.js Example

Example project with Normas.js and server-side rendering on Rails 5.1

### Installation

`bin/setup` — should be enough

### Run

Run two different processes:

`bin/webpack-dev-server` — start webpack dev server

`bin/rails server -b 0.0.0.0 -p 3000 -e development` — start rails server

### Contributing

You can link `normas` from local setup for debugging this example with `normas`:

`cd ../.. && yarn link && cd examples/normas_on_rails && yarn link "normas"`

and unlink with `yarn unlink "normas"`

### Info 

This project bootstrapped with command: 

`rails new normas_on_rails --skip-coffee --skip-sprockets --skip-turbolinks --webpack=react --skip-active-record  -T`
