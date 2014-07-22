'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var NMGgenerator = module.exports = function NMGgenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NMGgenerator, yeoman.generators.NamedBase);

NMGgenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var _this = this;
    
    //jquery library vesion
    this.lib = {
        jQ1: '1.11.1',
        jQ2: '2.1.1'
    };

    this.log(this.yeoman);

    this.log(chalk.magenta('You are using yeoman NMG generator!'));

    //options
    var prompts = [{
        name: 'projectName',
        message: 'Project Name',
        default: path.basename(process.cwd())
    }, {
        name: 'version',
        message: 'Version Number',
        default: '0.0.1'
    }, {
        name: 'authorName',
        message: 'Author Name',
        default: 'Jones Ho'
    }, {
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
            name: 'grunt-sprite (Sprite slice images)',
            value: 'includeSprite',
            checked: true
        }, {
            name: 'grunt-pngmin (Optimize PNGs)',
            value: 'includePngmin',
            checked: true
        }, {
            name: 'grunt-timer (Count Task Run Time)',
            value: 'includeTimer',
            checked: true
        }]
    }, {
        type: 'list',
        name: 'jQLib',
        message: 'Which jQuery library would you like?',
        choices: [
            'jQuery ' + _this.lib.jQ1 + ' (for website)',
            'jQuery ' + _this.lib.jQ2 + ' (for wap)',
        ]
    }];

    this.prompt(prompts, function(props) {
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

        // include jquery version
        this.jQLib = this.jQLib.split(' ')[1];

        cb();
    }.bind(this));

};

NMGgenerator.prototype.app = function app () {
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');

    this.directory('source', 'source');
    this.directory('lib','lib');
};

NMGgenerator.prototype.projectfiles = function projectfiles () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
};
