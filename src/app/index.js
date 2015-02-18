'use strict';

angular.module('angulogin', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ngMockE2E', 'ngCookies', 'validation.match', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'app/main/main.html',
        controller: 'RegisterCtrl'
      })
      .when('/forgot', {
        templateUrl: 'app/main/main.html',
        controller: 'ForgotCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$provide', function($provide) {
    $provide.factory('userData', function() {
      var users = [
        {
          username: 'dane',
          email:    'dane@test.com',
          password: 'enad'
        },
        {
          username: 'alyssa',
          email:    'alyssa@test.com',
          password: 'assyla'
        },
        {
          username: 'rocio',
          email:    'rocio@test.com',
          password: 'oicor'
        },
        {
          username: 'schott',
          email:    'schott@test.com',
          password: 'ttohcs'
        },
        {
          username: 'brooke',
          email:    'brooke@test.com',
          password: 'ekoorb'
        }
      ];
      // factory function body that constructs users
      return {
        addUser: function(username, email, password) {
          users.push({
            username: username,
            email: email,
            password: password
          });
        },
        users: function() {
          return users;
        }
      };
    });
  }])
  .run(function($httpBackend, userData, $cookies) {

    delete $cookies.loggedIn;
    delete $cookies.mailSent;

    $httpBackend.whenPOST('/api/forgotmail').respond(function(method, url, data){
      data = JSON.parse(data);
      var mailing = false;

      //find email in users
      angular.forEach(userData.users(), function(value) {
        if (data.email == value.email) {
          mailing = true;
          $cookies.mailSent = true;
        }
      });

      if (mailing) {
        return [200, {message:'yes'}];
      } else {
        return [400, {message:'user not found'}];
      }
    });

    $httpBackend.whenPOST('/api/login').respond(function(method, url, data){
      data = JSON.parse(data);
      var login = false;

      //verify user
      angular.forEach(userData.users(), function(value) {
        if (data.username == value.username && data.password == value.password) {
          login = true;
          $cookies.loggedIn = true;
        }
      });

      if (login) {
        return [200, {message:'yes'}];
      } else {
        return [400, {message:'user not found'}];
      }

    });

    $httpBackend.whenPOST('/api/newuser').respond(function(method, url, data) {
      data = JSON.parse(data);
      var taken = false;

      //check to make sure username is unique
      angular.forEach(userData.users(), function(value) {
        if (data.username == value.username) {
          taken = true;
        }
      });

      if (!taken) {
        userData.addUser(data.username, data.email, data.password);
        console.log(userData);
        return [200, {message:'yes'}];
      } else {
        return [400, {message:'username taken'}];
      }

    });

    //allow our templates to be loaded
    $httpBackend.whenGET('app/main/main.html').passThrough();
    $httpBackend.whenGET('components/navbar/navbar.html').passThrough();
  })
;