'use strict';

angular.module('angulogin')
  .controller('ForgotCtrl', function ($scope, $http, $cookies) {
    $scope.title = "Forgot your Password? Enter your e-mail to reset";
    $scope.formName = "forgotForm";
    $scope.cookies = $cookies;
    $scope.fields = [
      { type: "email", label: 'Email', name: 'email', isRequired: true, value:'', extraError: [{type:'email', message: "Must be valid email."}, {type:'exists', message: "Sorry, we don't have an account matching that e-mail."}]},
    ];
    $scope.userFormSubmit = function(){
      console.log($scope.fields);
      var loggingUser = {};
      angular.forEach($scope.fields, function(value) {
        console.log(value);
        loggingUser[value.name] = value.value;
      });
      $scope.message = "Checking . . .";
      $http.post('/api/forgotmail', loggingUser).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          console.log('win');
          console.log('win');
          $scope.message = "Mock Email has been sent to " + loggingUser.email + ".";
        }).
        error(function(data, status, headers, config) {
          $scope.userForm.email.$setValidity('exists', false)
          $scope.message = "";
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log('lose');
        });
    };


  })
;
