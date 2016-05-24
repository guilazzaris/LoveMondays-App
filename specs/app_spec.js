(function(){
  'use strict';

  var jasmine = (function() {
    'use strict';

    var module = {
      value: 3004,
      
      getName: function(firstName, lastName) {
        return firstName + ' ' + lastName;
      },

      exports: {
        hello: function(firstName, lastName) {
          return 'Hello' + ' ' + module.getName(firstName, lastName);
        },

        getValue: function() {
          return module.value;
        }
      }
    };

    return module.exports;
  }());

  describe("Run tests:", function() {

    it('Say Hello', function() {
        expect(jasmine.hello('John', 'Doe')).toEqual('Hello John Doe');
    });

    it('Returns the private variable', function() {
        expect(jasmine.getValue()).toEqual(3004);
    });

  });

}());