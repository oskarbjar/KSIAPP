angular.module('starter.controllers', [])

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

.controller('PlaylistsCtrl', function ($scope, GamesFactory, $location, SingleGameFactory) {
  var singleGame  = [];
  $scope.playlists = GamesFactory.list;
  $scope.singleGame = GamesFactory.Game;
console.log($scope.singleGame);
console.log('single game');

$scope.GetGame = function(data)
{
  console.log('GetGame')
  console.log(data)
  SingleGameFactory.saveSingleGame(data);
  $location.path('app/game');

}


	$scope.GetGames = function ()
	{
		console.log("sss");

		$scope.Games = [];
		GamesFactory.GetGames();
		$scope.broadcast('scroll.refreshComplete');
	};


})

.controller('SingleGameCtrl', function($scope, SingleGameFactory, $http,$location) 
{
  $scope.SingleGame = SingleGameFactory.getSingleGame();
  $scope.SingleGamePlayerList =SingleGameFactory.GetPlayersInGame();

  $scope.GetSingleGamePlayerList = function ()
  {

    SingleGameFactory.SavePlayersInGame($scope.SingleGame.LeikurNumer);
      $location.path('app/gamereport');

  };

 

})

.factory('SingleGameFactory', function($http, $q)
  {
    var SingleGameFactory = {};
    SingleGameFactory.singleGamePlayersList = {};
    var url = 'http://ksiapi.azurewebsites.net/ksiapi/game/players/'; 

    var singleGame = [];
    return {
        saveSingleGame: function (data)
        {
            console.log('save game')
            singleGame = data;
        },
        getSingleGame: function () {
            return singleGame;
        },
        GetPlayersInGame:function() {
          console.log('SingleGameFactory.list')
          console.log(SingleGameFactory.list)
          return SingleGameFactory.singleGamePlayersList
        },
        SavePlayersInGame: function (GameID)
        {
          
          console.log("Hér er GetPlayersInGame");
          console.log(url+GameID);
           SingleGameFactory.singleGamePlayersList = [];
          return $http.get(url+GameID).then(function(response)
        {
          console.log(url+GameID);
         
            for (i=0; i< response.data.length; i++) {
             console.log(response.data[i]);
                SingleGameFactory.singleGamePlayersList.push(response.data[i]);
            };
        });

        }
    }


SingleGameFactory.ready = $q.all([
  SingleGameFactory.GetPlayersInGame()]);


  
  return SingleGameFactory
  })

.factory('GamesFactory', function($http, $q)
{
    console.log("GamesFactory");
    var url = 'http://ksiapi.azurewebsites.net/ksiapi/games/33503';
    var GamesFactory = [];

    GamesFactory.GetGames = function ()	{
        GamesFactory.list = [];
        return $http.get(url).then(function(response)
        {

            for (i=0; i< response.data.length; i++) {
                console.log(response.data[i]);
                GamesFactory.list.push(response.data[i]);
            };
        });
    };
	
	GamesFactory.ready = $q.all([
	GamesFactory.GetGames()]);
	
	console.log(GamesFactory.list);
	return GamesFactory
});





