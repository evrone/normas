# Normas.js Example

Example project with Normas.js and server-side rendering on Rails 5.1

### Installation

While in this example-project folder, one by one, run commands:
```
bin/setup
cd ../..
yarn link
cd examples/normas_on_rails
yarn link "normas"
```

### Run

Run two different processes:

`bin/webpack-dev-server` — start webpack dev server

`bin/rails server -b 0.0.0.0 -p 3000 -e development` — start rails server


### Info 

This project bootstrapped with command: 

`rails new normas-example --skip-coffee --skip-sprockets --skip-turbolinks --webpack=react --skip-active-record  -T`
