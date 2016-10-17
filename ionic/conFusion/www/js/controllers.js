angular.module('conFusion.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo','{}');
  
  $scope.reservation = {};  
  $scope.registration = {};

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
	$localStorage.storeObject('userinfo', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  // Create the reservation modal
  $ionicModal.fromTemplateUrl('templates/reserve.html', {
	  scope: $scope
  }).then( function(modal){
	  $scope.reserveForm = modal;
  });
  
  //Triggered in the login modal to close it
  $scope.closeReserve = function (){
	$scope.reserveForm.hide();  
  };

    //Open the reserve modal
	$scope.reserve = function(){
		$scope.reserveForm.show();
	};
	
	$scope.doReserve = function(){
		console.log('Doing reservation', $scope.reservation);
		$timeout(function(){
			$scope.closeReserve();
		}, 1000);
	};
	
	//Registration modal 
	$ionicModal.fromTemplateUrl('templates/register.html', {
		scope: $scope;
	}).then(function(modal){
		$scope.registerform = modal;
	});
	
	$scope.closeRegister = function(){
		$scope.registerform.hide();
	}
	
	$scope.register = function(){
		$scope.registerform.show();
	}
	
	$scope.doRegister = function(){
		console.log('Doing reservation', $scope.reservation);
		
		timeout(function(){
			$scope.closeRegister();
		},1000);
	}
	
	//Camera use
	
	$ionicPlatform.ready(function(){
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 100,
			targetHeight: 100,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum:false
		};
		
		$scope.takePicture = function(){
			$cordovaCamera.getPicture(options).then(
				function(imageData){
					$scope.registration.imgSrc = "data:image/jpeg;base64,"+imageData;
				},
				function(err){
					console.log(err);
				});
			$scope.registerform.show();	
		}
		
		///Gallery
		
		var galleryOptions = {
			maximumImagesCount: 10,
			width: 100,
			height: 100,
			quality: 50
		};
		
		$scope.selectImage = function (){
			$cordovaImagePicker.getPictures(galleryOptions).then(
				function(results){
					for(var i = 0; i < results.length; i++){
						console.log('Image URI: ' + results[i]);
						$scope.registration.imgSrc = results[i];
					}
				},
				function(error){
					//error getting photos
				}
			);
			$scope.registerform.show();	
		}
		
		
	});
	
})

        .controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory','baseURL', '$ionicListDelegate', 'dishes', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast',
		function($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, dishes, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
            
            $scope.baseURL = baseURL;
			$scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
			$scope.dishes = dishes;
			
            /*menuFactory.query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
			*/
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
			
			$scope.addFavorite = function(index){
				console.log("index is " + index);
				favoriteFactory.addToFavorite(index);
				$ionicListDelegate.closeOptionButtons();
				
				   $ionicPlatform.ready(function () {
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: "Added Favorite",
                    text: $scope.dishes[index].name
                }).then(function () {
                    console.log('Added Favorite '+$scope.dishes[index].name);
                },
                function () {
                    console.log('Failed to add Notification ');
                });

                $cordovaToast
                  .show('Added Favorite '+$scope.dishes[index].name, 'long', 'center')
                  .then(function (success) {
                      // success
                  }, function (error) {
                      // error
                  });
        });
				
				/*
				$ionicPlatform.ready(function(){
					$cordovaLocalNotification.schedule({
						id : 1,
						title: "Added Favorite",
						text: $scope.dishes[index].name
					}).then(
						function(){
							console.log('Added Favorite ' + $scope.dishes[index].name);
						},
						function(){
							console.log('Failed to add Favorite');
						}
					);
				});
				
				$cordovaToast
					.show('Added Favorite ' + $scope.dishes[index].name, 'long', 'center')
					.then(
						function(success){
							//success
						},
						function(error){
							//error
						}
					);*/
				
			};
			
			
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL','$ionicPopover', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast',
			function($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
            
            $scope.baseURL = baseURL;
			$scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
			
			$scope.mycomment = {rating:5, comment:"", author:"", date:""};
            $scope.dish = dish;
			
            /*$scope.dish = menuFactory.get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );*/
			
			$scope.popover = $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
				scope:$scope
			}).then(function(popover) {
                $scope.popover = popover;
              });
			
			$scope.openPopover = function($event){
				$scope.popover.show($event);
			}
			
			$scope.closePopover = function(){
				$scope.popover.hide();
			}
			
			$scope.addFavorite = function(index){
				favoriteFactory.addToFavorite(index);
				$scope.closePopover();
				
				//Notification
				$ionicPlatform.ready(){
					$cordovaLocalNotification.schedule({
						id:1,
						title:"Added Favorite",
						text: $scope.dishes[index].name
					})then(
						function(){
							console.log('Added Favorite ' + $scope.dishes[index].name);
						},
						function(){
							console.log('Failed to add Notification');
						}
					);
					
					$cordovaToast
						.show('Added Favorite ' + $scope.dishes[index].name, 'long', 'bottom')
						.then(
							function(success){
								//success
							},
							function(error){
								//error
							}
						);
				}
			};
			
			//Create the comments modal
			$ionicModal.fromTemplateUrl('templates/comments.html', {
				scope: $scope
			}).then(function(modal){
				$scope.commentForm = modal;
			});
	
			//Close the comment modal
			$scope.closeComment = function(){
				$scope.commentForm.hide();
			}
	
			//Open the comment modal
			$scope.comments = function(){
				$scope.commentForm.show();
			};
			
			$scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                $scope.dish.comments.push($scope.mycomment);
				$scope.mycomment = {rating:5, comment:"", author:"", date:""};
				
				$scope.closePopover();
				$scope.closeComment();
            };
			
        }])

        // implement the IndexController and About Controller here

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory','promotionFactory','baseURL', 'dish', 'promo', 'leader', function($scope, menuFactory, corporateFactory, promotionFactory, baseURL, dish, promo, leader) {
                                        
                        $scope.baseURL = baseURL;
                        $scope.showDish = false;
                        $scope.message="Loading ...";
                        
						$scope.dish = dish;
						$scope.promotion = promo;
						$scope.leader = leader;
						
						/*$scope.dish = menuFactory.get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                        
						$scope.promotion = promotionFactory.get({id:0});
						$scope.leader = corporateFactory.get({id:3});*/
            
                    }])

        .controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', 'leaders', function($scope, corporateFactory, baseURL, leaders) {
            
                    $scope.baseURL = baseURL;
					$scope.leaders = leaders;
					//$scope.leaders = corporateFactory.query();
                    console.log($scope.leaders);
            
        }])

		.controller('FavoritesController', ['$scope', 'dishes', 'favorites' ,'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading','$timeout', '$ionicPlatform', '$cordovaVibration',
			function($scope, dishes, favorites,  favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $ionicPlatform, $cordovaVibration){
				
				$scope.baseURL = baseURL;
				$scope.shouldShowDelete = false;
				
				/*$ionicLoading.show({
					template: '<ion-spinner></ion-spinner>Loading...'
				});*/
				
				$scope.favorites = favorites ; //favoriteFactory.getFavorites();
				$scope.dishes = dishes;
				
				/*$scope.dishes = menuFactory.query(
					function(response){
						$scope.dishes = response;
						$timeout(function(){
							$ionicLoading.hide();
						}, 1000);
					},
					function(response){
						$scope.message = "Error: " + response.status + " " + response.statusText;
						$timeout(function(){
							$ionicLoading.hide();
						}, 1000);
					}
				);*/
				
				//console.log($scope.dishes, $scope.favorites);
				
				$scope.toggleDelete = function(){
					$scope.shouldShowDelete = !$scope.shouldShowDelete;
					console.log($scope.shouldShowDelete);
				}
				
				$scope.deleteFavorite = function(index){
					
					var confirmPopup = $ionicPopup.confirm({
						title: 'Confirm Delete',
						template: 'Are you sure you want to delete this item?'
					});
					
					confirmPopup.then(function(res){
						if(res){
							console.log('Ok to delete');
							favoriteFactory.deleteFromFavorites(index);
							
							$ionicPlatform.ready(function(){
								$cordovaVibration.vibrate(100);
							});
							
						}else{
							console.log('Canceled delete');
						}
					});
					
					$scope.shouldShowDelete = false;
				}
		}])
		
		
		///////////////////////// Custom Filter /////////////////////////

		.filter('favoriteFilter', function(){
			return function(dishes, favorites){
				var out = [];
				
					for(var i = 0; i < favorites.length; i++ ){
						for(var j = 0; j < dishes.length; j++){
							if (dishes[j].id === favorites[i].id)
								out.push(dishes[j]);
						}
					}
				return out;
			}
		})
;