# [Isaki](https://github.com/IcaliaLabs/isaki)

Isaki is a lightweight & happy front-end set up to build static pages with GruntJS created and maintained by [Abraham Kuri](https://twitter.com/kurenn) from [Icalia Labs](http://twitter.com/icalialabs).


## Table of contents
- [Installation](#installation)
- [Bug tracker & feature request](#bug-tracker-&-feature-request)
- [Contributing](#contributing)
- [Community](#community)
- [Heroes](#heroes)
- [License](#license)

## Installation

Isaki uses [Grunt](http://gruntjs.com/) to compile all the Sass and CoffeeScript code. Before getting started you need to add the necessary dependencies:

### Installing Grunt

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Clone the project `git clone https://github.com/IcaliaLabs/isaki.git`
2. Navigate to the root directory, then run `npm install`. npm will look at [package.json](https://github.com/icalialabs/isaki/blob/master/package.json) and automatically install the necessary local dependencies listed there.

If you need to install npm, or you are not quite sure what it is, here is a quick link for you to get started. [NPM](https://github.com/npm/npm)

### Available Grunt tasks

Some of the grunt tasks are:

#### Compile and minify CSS - `grunt compile-css`
This task compiles the all the `.scss` files and the minifies them for production.

#### Compile and minify JS - `grunt compile-js`
This task compiles the all the `.coffee` files and the uglifies the `.js` files for production.

#### Deploy - `grunt deploy`
Runs the two tasks above

#### Server - `grunt server`
Lift the server up and watches for changes on the `.scss` or `.coffee` files and rebuilds the whole project.


## Bug tracker & feature request

Have a bug or a feature request? [Please open a new issue](https://github.com/IcaliaLabs/isaki/issues). Before opening any issue, please search for existing issues.

### Workflow

You can use this simple workflow:

1. `cd` to the isaki project.
2. Run `grunt server` to start working

We also include livereload to reload when the watch task is over, for more info refer to the our [Gruntfile](https://github.com/IcaliaLabs/isaki/blob/master/Gruntfile.js)

## Contributing

Please submit all pull requests against a separate branch. Please follow the standard for naming the variables, mixins, etc.

In case you are wondering what to attack, we hnow have a milestone with the version to work, some fixes and refactors. Feel free to start one.

Thanks!

## Community

Keep track of new feautres, development issues and community news.

* Follow [@icalialabs](https://twitter.com/icalialabs)
* Have a question about anything, email us at weare@icalialabs.com


## Heroes

**Abraham Kuri**

+ [http://twitter.com/kurenn](http://twitter.com/kurenn)
+ [http://github.com/kurenn](http://github.com/kurenn)
+ [http://klout.com/#/kurenn](http://klout.com/#/kurenn)


## Copyright and license

Code and documentation copyright 2013-2014 Icalia Labs. Code released under [the MIT license](LICENSE).
