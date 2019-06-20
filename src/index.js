import angular from 'angular'
import ngSanitize from 'angular-sanitize'
import FormCtrl from './FormCtrl'
import * as NameSplitter from './NameSplitter'
import config from './config'

require('objectpath')
require('tv4')
require('angular-schema-form/dist/schema-form')
require('angular-schema-form-bootstrap/bootstrap-decorator')

angular.module('foobar', ['schemaForm', ngSanitize])
  .constant('CONFIG', config)
  .controller('FormCtrl', FormCtrl)

  // adding custom schema form type NameSplitter
  .run(NameSplitter.Runner)
  .config(NameSplitter.Config)
  .directive(NameSplitter.Name, NameSplitter.Directive)
