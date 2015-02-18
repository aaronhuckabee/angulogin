'use strict';

angular.module('angulogin')
  .controller('LoginCtrl', function ($scope, $http, $cookies) {
    $scope.title ="Enter your Username and Password to login.";
    $scope.formName = "loginForm";
    $scope.message = "";
    $scope.cookies = $cookies;
    $scope.fields = [
      { type: "text", label: 'Username', name: 'username', isRequired: true, value:''},
      { type: "text", label: 'Password', name: 'password', isRequired: true , value:''},
    ];
    $scope.userFormSubmit = function(){
      var loggingUser = {};
      angular.forEach($scope.fields, function(value) {
        loggingUser[value.name] = value.value;
      });
      $scope.message = "Logging in . . .";
      $http.post('/api/login', loggingUser).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          console.log('win');
          $scope.message = "You have successfully logged in.";
          console.log($cookies);
        }).
        error(function(data, status, headers, config) {
          $scope.message = "Please try again. Username and Password combo not found";
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log('lose');
        });
    };
  });