( function() {
  var app = angular.module('starter', ['ionic']);

  app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    });

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: "AddCtrl"
    });

    $stateProvider.state('edit', {
      url: '/edit/:noteId',
      templateUrl: 'templates/edit.html',
      controller: "EditCtrl"
    });

    $urlRouterProvider.otherwise('/list')
  });

   var notes = [];

  function getNote(noteId) {
    for (var i=0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i];
      }
    }
    return undefined;
  }

  function createNote(note) {
    notes.push(note);
  }

  function updateNote(note) {
    for (var i=0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        notes[i] = note;
        return;
      }
    }
  }

  app.controller('ListCtrl', function($scope) {
    $scope.notes = notes;
  });

  app.controller('AddCtrl', function($scope, $state) {

    $scope.note = {
      id: new Date().getTime.toString(),
      title: '',
      description: ''
    };

    $scope.save = function() {
      createNote($scope.note);
      $state.go('list');
    }

  });

  app.controller('EditCtrl', function($scope, $state) {

    $scope.note = angular.copy(getNote($state.params.noteId));

    $scope.save = function() {
      updateNote($scope.note);
      $state.go('list');
    }

  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
}() );