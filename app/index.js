'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var F2eGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        this.lib = {
            jQ1 : '1.11.0',
            jQ2 : '2.1.0',
            seajs : '2.2.0'
        };

        var _this = this;

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('You are using yeoman NMG generator!'));

        var prompts = [
            {
                name: 'projectName',
                message: 'Project Name',
                default: path.basename(process.cwd())
            },
            {
                name: 'version',
                message: 'Version Number',
                default: '0.0.1'
            },
            {
                name: 'authorName',
                message: 'Author Name',
                default: ''
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'What more would you like?',
                choices: [
                    {
                        name: 'grunt-sprite (Sprite slice images)',
                        value: 'includeSprite',
                        checked: false
                    },
                    {
                        name: 'grunt-pngmin (Optimize PNGs)',
                        value: 'includePngmin',
                        checked: true
                    },
                    {
                        name: 'grunt-timer (Count Task Run Time)',
                        value: 'includeTimer',
                        checked: true
                    },
                    {
                        name: 'grunt-2x2x (Generate images from @2x -> @1x)',
                        value: 'include2x2x',
                        checked: false
                    },
                    {
                        name: 'JS: seajs  (' + _this.lib.seajs + ')',
                        value: 'includeSeajs',
                        checked: false
                    }
                ]
            },
            {
                type: 'list',
                name: 'jQLib',
                message: 'Which jQuery library would you like?',
                choices:[
                    'jQuery ' + _this.lib.jQ1,
                    'jQuery ' + _this.lib.jQ2,
                ]
            }
        ];

        this.prompt(prompts, function (props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            };

            var features = props.features;

            function hasFeature(feat) {
                return features.indexOf(feat) !== -1;
            }

            // include grunt
            this.includeSprite = hasFeature('includeSprite');
            this.includePngmin = hasFeature('includePngmin');
            this.includeTimer = hasFeature('includeTimer');
            this.include2x2x = hasFeature('include2x2x');

            // include seajs
            this.includeSeajs = hasFeature('includeSeajs');

            done();
        }.bind(this));
    },

    app: function () {
        this.directory('html', 'html');
        this.directory('css', 'css');
        this.directory('img', 'img');
        this.directory('js', 'js');
        this.directory('slice', 'slice');

        this.copy('Gruntfile.js', 'Gruntfile.js');
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = F2eGenerator;