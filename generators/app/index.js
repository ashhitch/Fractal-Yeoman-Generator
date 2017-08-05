'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const  htmlwiring = require('html-wiring');

module.exports = class extends Generator {

  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the ${chalk.red('Fractal')} generator!`
    ));

  }
  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'type',
      message: 'Hi, what would you like to create?',
      choices: ['element', 'component', 'container', 'pattern', 'page', 'template']
    }, {
      type: 'input',
      name: 'name',
      message: 'What will this be called (i.e. \' Card\')',
    }, {
      type: 'input',
      name: 'elements',
      message: 'What elements will this have? (i.e. \'my-el, my-other-el\')',
    }]).then((answers) => this.answers = answers);

  }

  writting() {
    this.answers.name_dash = this.answers.name.replace(/ /g, '-').replace(/_/g, '-').toLowerCase();
    this.answers.name_underscore = this.answers.name.replace(/ /g, '_').replace(/-/g, '_').toLowerCase();
    this.answers.elements_dash = this.answers.elements.replace(/ /g, '').replace(/_/g, '-').toLowerCase();
    this.answers.elements_underscore = this.answers.elements.replace(/ /g, '').replace(/-/g, '_').toLowerCase();

    switch (this.answers.type) {
      case 'element':
        var path = `library/01-elements/${this.answers.name_dash}/`;
        break;
      case 'component':
        var path = `library/02-components/${this.answers.name_dash}/`;
        break;
      case 'container':
        var path = `library/03-containers/${this.answers.name_dash}/`;
        break;
      case 'pattern':
        var path = `library/04-patterns/${this.answers.name_dash}/`;
        break;
      case 'template':
        var path = `library/05-templates/${this.answers.name_dash}/`;
        break;
      case 'page':
        var path = `library/06-pages/${this.answers.name_dash}/`;
        break;
    }

    if (this.answers.type == 'template') {
      this.fs.copyTpl(
        this.templatePath('_template.hbs'),
        this.destinationPath(path + this.answers.name_dash + '.hbs'), {
          props: this.answers
        }
      );

    } else {

      this.fs.copyTpl(
        this.templatePath('_component.hbs'),
        this.destinationPath(path + this.answers.name_dash + '.hbs'), {
          props: this.answers
        }
      );

    }
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath(path + 'README.md'), {
        props: this.answers
      }
    );
    this.fs.copyTpl(
      this.templatePath('_component.tests.js'),
      this.destinationPath(path + this.answers.name_dash + '.tests.js'), {
        props: this.answers
      }
    );
    if (this.answers.type == 'component' || this.answers.type == 'template' || this.answers.type == 'element' || this.answers.type == 'container') {

      this.fs.copyTpl(
        this.templatePath('_component.scss'),
        this.destinationPath(path + this.answers.name_dash + '.scss'), {
          props: this.answers
        }
      );

      const hook = '/*----------  //End ' + this.answers.type +'  ----------*/';
      const sassFileLocation = 'src/styles/main.scss';
      const sassFile = htmlwiring.readFileAsString(sassFileLocation);
      const insert = '@import "../../' + path + this.answers.name_dash + '.scss' +'";';

      if (sassFile.indexOf(insert) === -1) {
        const newContent = sassFile.replace(hook, insert+'\n'+hook);
        htmlwiring.writeFileFromString(newContent, sassFileLocation);

        this.log(`${this.answers.type} added to ${chalk.green(sassFileLocation)}`);
      }

    }
    if (this.answers.type == 'component' || this.answers.type == 'container' || this.answers.type == 'element' || this.answers.type == 'page') {

      this.fs.copyTpl(
        this.templatePath('_component.config.yml'),
        this.destinationPath(path + this.answers.name_dash + '.config.yml'), {
          props: this.answers
        }
      );

    }
  }


};