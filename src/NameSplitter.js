import angular from 'angular'

/**
 * Example AngularJS schema-form addOn which splits full name into first/last
 * and sets split values back to the form model
 */

/**
 * This function should be passed to angular.run()
 */
function Runner ($templateCache) {
  // whole form "model" is accessible in template $scope
  // sf-field-model is transformed into ng-model="model[form.key]"
  // sf-field-model="name-splitter" will be transformed to name-splitter="model[form.key]"
  $templateCache.put('nameSplitter.html', `<div>
        <div class="form-group" sf-field-model="name-splitter" global-model="model">
          <label>{{form.title}}</label>
          <input sf-field-model
                   type="text"
                   class="form-control"
                   id="nameinput"
                   aria-describedby="nameHelp"
                   placeholder="Your full name">
          <div class="help-block" id="nameHelp" sf-message="form.description"></div>
        </div>
    </div>`)
}

Runner.$inject = ['$templateCache']

/**
 * This function should be passed to angular.config()
 */
function Config (schemaFormDecoratorsProvider, sfBuilderProvider) {
  schemaFormDecoratorsProvider.defineAddOn(
    'bootstrapDecorator', // Name of the decorator you want to add to.
    'nameSplitter', // Form type that should render this add-on
    'nameSplitter.html', // Template name in $templateCache
    sfBuilderProvider.stdBuilders // List of builder functions to apply.
  )
}

Config.$inject = ['schemaFormDecoratorsProvider', 'sfBuilderProvider']

/**
 * This function should be registered as directive angular.directive(Name, fn)
 */
function Directive () {
  return {
    scope: {
      nameSplitter: '<',
      globalModel: '='
    },
    link: function ($scope) {
      $scope.$watch('nameSplitter', (newVal) => {
        let fullName = newVal
        if (!angular.isString(fullName)) {
          fullName = ''
        } else {
          fullName.trim()
        }
        let firstNames = fullName || undefined
        let lastName
        const lastSpaceIdx = fullName.lastIndexOf(' ')
        if (lastSpaceIdx > -1) {
          firstNames = fullName.substring(0, lastSpaceIdx).trim()
          lastName = fullName.substring(lastSpaceIdx).trim()
        }

        $scope.globalModel.firstName = firstNames
        $scope.globalModel.lastName = lastName
      })
    }
  }
}

Directive.$inject = []

/**
 * Name of above directive to be used at the time of registration
 * @type {string}
 */
const Name = 'nameSplitter'

export {
  Runner, Config, Directive, Name
}
