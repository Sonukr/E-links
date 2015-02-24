
angular.module('link', ['ngRoute', 'firebase'])

.value('fbURL', 'https://your firebase url//')

.factory('links', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL)).$asArray();
})

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/edit/:linkId', {
      controller:'EditCtrl',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('ListCtrl', function($scope, links) {
  $scope.links = links;
})

.controller('CreateCtrl', function($scope, $location, $timeout, links) {
  $scope.save = function() {
      links.$add($scope.link).then(function(data) {
          $location.path('/');
      });
  };
})

.controller('EditCtrl',
  function($scope, $location, $routeParams, links) {
    var linkId = $routeParams.linkId,
        linkIndex;

    $scope.links = links;
    linkIndex = $scope.links.$indexFor(linkId);
    $scope.link = $scope.links[linkIndex];

    $scope.destroy = function() {
        $scope.links.$remove($scope.link).then(function(data) {
            $location.path('/');
        });
    };

    $scope.save = function() {
        $scope.links.$save($scope.link).then(function(data) {
           $location.path('/');
        });
    };
});
