# ember-cli-analytics-statcounter

This is a simple Statcounter integration for [ember-cli-analytics](https://github.com/tomasbasham/ember-cli-analytics/)

## Installation

* `ember install ember-cli-analytics`
* add this project to your package.json

## Configuration

```
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    analytics: {
      integrations: [
        {
          name: 'Statcounter',
          config: {
             sc_project: ####,
             sc_security: 'secret',
             sc_invisible: 1,
             //more sc_variables
          }
        },
      ]
    },
  };

  return ENV;
};
```
