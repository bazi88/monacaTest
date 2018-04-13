angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats,$http,$rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.loadListVideo = function(){
        var access_token;
          $http.get("http://monaca.bcove.dev3.altplus.vn/index.php").then(function(response) {
          response = JSON.parse(response.data);
          access_token = response;
    });
    function getListData (){
      return $http({
            url : 'http://monaca.bcove.dev3.altplus.vn/getListVideo.php',
            method : 'GET',
        })
    }
  // Might use a resource here that returns a JSON array
  // Some fake testing data
    var array_list_video = getListData().then(response =>{
      $scope.list_videos = response.data;
      console.log($scope.list_videos)
    });
  }


  $scope.chats = Chats.all();
        $scope.favorite= function(){
       console.log("234234")
    }
  $scope.loadListVideo();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $sce) {
    Chats.get($stateParams.chatId).then(response =>{
      $scope.link = response.data;
      for(var i =0; i<response.data.length;i++){
        if(i===7){
          $scope.normalSrc = response.data[7];
          console.log($scope.normalSrc)
        }
      }
  });

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
