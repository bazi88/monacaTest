angular.module('starter.controllers', [])
    .controller('DashCtrl', function($scope, $rootScope, $timeout, $ionicTabsDelegate) {
        $scope.list_favorites = [];
        $scope.doRefresh = function() {

            console.log('Refreshing!');
            $timeout(function() {
                //simulate async response
                $scope.list_favorites = $rootScope.listFavorite;
                $scope.$broadcast('scroll.refreshComplete');
            }, 300)
        }
    })

.controller('ChatsCtrl', function($scope, Chats, $http, $rootScope, $q) {
    $scope.is_list_videos = [];
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.loadListVideo = function() {
        var access_token;
        $http.get("http://monaca.bcove.dev3.altplus.vn/index.php").then(function(response) {
            response = JSON.parse(response.data);
            access_token = response;
        });

        function getListData() {
            return $http({
                url: 'http://monaca.bcove.dev3.altplus.vn/getListVideo.php',
                method: 'GET',
            })
        }
        // Might use a resource here that returns a JSON array
        // Some fake testing data
        var array_list_video = getListData().then(response => {
            $scope.list_videos = response.data;

            $q.all($scope.list_videos.map(function(res, key) {
                console.log(res);
                res.added = false;
                $scope.list_videos = res;
                $scope.is_list_videos.push(res);
            }));

        })
    }


    $scope.chats = Chats.all();
    $rootScope.listFavorite = [];
    $scope.changeFavorite = function(images, id, name, list_video, key) {
        var newArray = [];
        console.log(list_video);
        list_video.added = !list_video.added;
        console.log(list_video);
        var info_favorite = {
            'images': images,
            'id': id,
            'name': name,
            'added': !list_video.added
        };
        console.log(info_favorite);
        if (list_video.added == true) {
            for (var k = 0; k < $rootScope.listFavorite.length; k++) {
                newArray.push($rootScope.listFavorite[k].id);
            }
            newArray.indexOf(info_favorite.id) === -1 ? $rootScope.listFavorite.push(info_favorite) : console.log("Have in array");
            console.log($rootScope.listFavorite);
        }
    }

    $scope.loadListVideo();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $sce) {
    Chats.get($stateParams.chatId).then(response => {
        $scope.link = response.data;
        for (var i = 0; i < response.data.length; i++) {
            if (i === 7) {
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