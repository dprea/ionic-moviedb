angular.module('moviedb.controllers', [])
.constant('apiKey', '@@apiKey')
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('GenresCtrl', function($scope, $http, apiKey) {
  var vm = this;
  vm.genres = [];
  vm.getGenres = getGenres;

  init();
  function init() {
    vm.getGenres();
  }

  function getGenres() {
    var url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=en-US';

    $http({
      method: 'GET',
      url: url
    }).success(function(data) {
      vm.genres = data.genres;
    }).error(function(res) {
      console.log('Get Genres Error! ', res);
    });
  }
})
.controller('GenreCtrl', function($scope, $stateParams, $http, apiKey) {
  var vm = this;
  vm.movies = [];
  vm.getMovies = getMovies;
  vm.genreName = $stateParams.genreName;

  init();
  function init() {
    vm.getMovies();
  }

  function getMovies() {
    var url = 'https://api.themoviedb.org/3/genre/' + $stateParams.genreId + '/movies?api_key=' + apiKey + '&language=en-US&sort_by=created_at.asc';
    $http({
      method: 'GET',
      url: url
    }).success(function(data) {
      vm.movies = data.results;
    }).error(function(res) {
      console.log('Get Genres Error! ', res);
    });
  }
})
.directive('mdbPageHeader', function() {
  return {
    scope: {
      text: '=text'
    },
    template: '<h1 ng-bind="text"></h1>'
  };
});
