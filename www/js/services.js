angular.module('starter.services', [])
.factory('Chats', function($http,$rootScope) {
  function getVideos(videos_id,cb){
    var videos_id_obj = 'videos_id='+videos_id;
                 return $http({
                        method : 'POST',
                        url : 'http://monaca.bcove.dev3.altplus.vn/getVideos.php',
                        data: videos_id_obj,
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
                }).success(function(response){
                }).error(function(error){
                        console.log(error);
                })
  };

  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    access_token:function(){
      return access_token;
    },
    get_list_video:function(){
      return array_list_video;
    },
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      return getVideos(chatId);
    }
  };
});
