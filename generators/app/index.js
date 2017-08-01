'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Fractal') + ' generator!'
    ));



  }


  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'type',
      message: 'What would you like to create?',
      choices: ['element', 'component', 'container', 'pattern', 'page', 'template']
    }, {
      type: 'input',
      name: 'name',
      message: 'What will this be called (i.e. \' Card\')',
    }, {
      type: 'input',
      name: 'elements',
      message: 'What elements will this have? (i.e. \'my-el, my-other-el\')',
    }]).then((answers) => {
      this.props = answers;
    });

  }



  writting() {

    this.props.name_dash = this.props.name.replace(/ /g, "-").replace(/_/g, "-").toLowerCase();
    this.props.name_underscore = this.props.name.replace(/ /g, "_").replace(/-/g, "_").toLowerCase();

    this.props.elements_dash = this.props.elements.replace(/ /g, "").replace(/_/g, "-").toLowerCase();
    this.props.elements_underscore = this.props.elements.replace(/ /g, "").replace(/-/g, "_").toLowerCase();

    switch (this.props.type) {
      case "element":
        var path = "library/01-elements/" + this.props.name_dash + "/";
        break;
      case "component":
        var path = "library/02-components/" + this.props.name_dash + "/";
        break;
      case "container":
        var path = "library/03-containers/" + this.props.name_dash + "/";
        break;
      case "pattern":
        var path = "library/04-patterns/" + this.props.name_dash + "/";
        break;
      case "template":
        var path = "library/05-templates/" + this.props.name_dash + "/";
        break;
      case "page":
        var path = "library/06-pages/" + this.props.name_dash + "/";
        break;
    }

    if (this.props.type == 'template') {
      this.fs.copyTpl(
        this.templatePath('_template.hbs'),
        this.destinationPath(path + this.props.name_dash + '.hbs'), {
          props: this.props
        }
      );

    } else {

      this.fs.copyTpl(
        this.templatePath('_component.hbs'),
        this.destinationPath(path + this.props.name_dash + '.hbs'), {
          props: this.props
        }
      );

    }
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath(path + 'README.md'), {
        props: this.props
      }
    );
    this.fs.copyTpl(
      this.templatePath('_component.tests.js'),
      this.destinationPath(path + this.props.name_dash + '.tests.js'), {
        props: this.props
      }
    );
    if (this.props.type == 'component' || this.props.type == 'template' || this.props.type == 'element' || this.props.type == 'container') {

      this.fs.copyTpl(
        this.templatePath('_component.scss'),
        this.destinationPath(path + this.props.name_dash + '.scss'), {
          props: this.props
        }
      );

    }
    if (this.props.type == 'component' || this.props.type == 'container' || this.props.type == 'element' || this.props.type == 'page') {

      this.fs.copyTpl(
        this.templatePath('_component.config.yml'),
        this.destinationPath(path + this.props.name_dash + '.config.yml'), {
          props: this.props
        }
      );

    }
  }


};