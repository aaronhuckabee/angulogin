'use strict';

angular.module('angulogin')
  .controller('RegisterCtrl', function ($scope, $http, $cookies) {

    $scope.title ="Register New User";
    $scope.message = "";
    $scope.formName = "registerForm";
    $scope.fields = [
      { type: "text", label: 'Username', name: 'username', isRequired: true, value:'', extraError: [{type:'taken', message: "Please select another name, this one is already taken."}]},
      { type: "email", label: 'Email', name: 'email', isRequired: true, value:'', extraError: [{type:'email', message: "Must be valid email."}]},
      { type: "password", label: 'Password', name: 'password', isRequired: true , value:''},
      { type: "password", label: 'Confirm Password', name: 'password2', isRequired: true, value:'', match:'password', extraError: [{type:'match', message: "Passwords must match."}] }
    ];

    $scope.userFormSubmit = function(){
      var creatingUser = {};
      angular.forEach($scope.fields, function(value) {
        creatingUser[value.name] = value.value;
      });

      $scope.message = "Registering . . .";


      $http.post('/api/newuser', creatingUser)

        .success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.message = "You have successfully created user " + creatingUser.username + ".";
        })

        .error(function(data, status, headers, config) {
          $scope.message = "";
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.userForm.username.$setValidity('taken', false)
        });

    };
  });