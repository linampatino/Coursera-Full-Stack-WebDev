
'use strict';

angular.module('confusionApp')

		.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
		
			$scope.tab = 1;
			$scope.filtText = '';
			$scope.showDetails = false;
			$scope.showMenu = false;
			$scope.message = "Loading ...";
			
			menuFactory.getDishes().query(
				function(response){
					$scope.dishes = response;
					$scope.showMenu = true;
				},
				function(response){
					$scope.message = "Error: " + response.status + " " +response.statusText ;
				}
			);
			
			/*menuFactory.getDishes()
				.then(
						function(response){
							$scope.dishes = response.data;
							$scope.showMenu = true;
						},
						function(response){
							$scope.message = "Error: " + response.status + " " +response.statusText ;
						}
				);*/
			
			$scope.select = function(setTab){
				$scope.tab = setTab;
				
				if(setTab === 2)
					$scope.filtText = 'appetizer';
				else if(setTab === 3)
					$scope.filtText = 'mains';
				else if (setTab === 4)
					$scope.filtText = 'dessert';
				else
					$scope.filtText = '';
					
			};
			
			$scope.isSelected = function(checkTab){
				return ($scope.tab === checkTab);
			};
			
			$scope.toggleDetails = function(){
				$scope.showDetails = !$scope.showDetails;
			};
			
			
		}])
		
		.controller('ContactController', ['$scope', function($scope){
		
			$scope.feedback = { 
					myChannel:"",
					firstName:"",
					lastName:"",
					agree:false,
					email:""
				};
			
			var channels=[{value:"tel", label:"Tel."},
						  {value:"email", label:"Email"}];
			
			$scope.channels=channels;
			$scope.invalidChannelSelection=false;
			
			
		
		}])
		
		.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory){
		
			$scope.sendFeedback = function(){
				
				console.log($scope.feedback);
				$scope.message;
				$scope.showMessage = false;
				
				//Validation
				if ($scope.feedback.agree && ($scope.feedback.myChannel==="")){
					$scope.invalidChannelSelection=true;
					console.log('incorrect');
				}else{
					
					//save info
					feedbackFactory.saveFeedback().save($scope.feedback)
						.$promise.then(
							function(response){
								$scope.showMessage = true;
								$scope.message = 'Your feedback has been sending'
								$scope.feedbackForm.$setPristine();
							},
							function(response){
								$scope.message = "Error: " + response.status + " " +response.statusText ;
							}					
						);
					
					$scope.invalidChannelSelection = false;
					console.log($scope.feedback);
					$scope.feedback = { 
						myChannel:"",
						firstName:"",
						lastName:"",
						agree:false,
						email:""
				};
				
				$scope.feedback.mychannel="";
				$scope.feedbackForm.$setPristine();
				console.log($scope.feedback);
				}
			};
		}])
		
		.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

			$scope.showDish = false;
			$scope.message = "Loading ...";
			$scope.dish = {};
			
			$scope.dish = 
						menuFactory.getDishes().get({id: parseInt($stateParams.id,10)})
							.$promise.then(
								function(response){
									$scope.dish = response;
									$scope.showDish = true;
								},
								function(response){
									$scope.message = "Error: " + response.status + " " +response.statusText ;
								}
							);
			
			/*menuFactory.getDish(parseInt($stateParams.id,10))
				.then(
						function(response){
							$scope.dish = response.data;
							$scope.showDish = true;
						},
						function(response){
							$scope.message = "Error: " + response.status + " " +response.statusText ;
						}
				);*/
			
			var sort = '';
            
			$scope.sort = sort;
            
        }])
		
		.controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory){
		
			//Step1: Create a JavaScript object to hold the comment from the form
			$scope.newComment = {
					rating:5,
                    comment:"",
                    author:"",
                    date:""
				};
			
			$scope.submitComment= function(){
			
				//Step 2: This is how you record the date
				var date = new Date().toISOString();
				$scope.newComment.date = date;
				
				//Step 3: Push your comment into the dish's comment array
				var tempDishes = $scope.dish.comments;
				tempDishes.push($scope.newComment);
				
				menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
				
				$scope.dish.comments = tempDishes;
				
				//Step 4: Reset your form to pristine
				$scope.commentForm.$setPristine();
				
				//Step 5: Reset your JavaScript object that holds your comment
				$scope.newComment = {
					rating:5,
                    comment:"",
                    author:"",
                    date:""
				};
			};
		}])
		
		.controller('IndexController',['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){
			var index = 0;
			
			$scope.showDish = false;
			$scope.showPromotion = false;
			$scope.showChef = false;
			
			$scope.message = "Loading ...";
			
			$scope.promotion = menuFactory.getPromotion().get({id: index})
				.$promise.then(
					function(response){
						$scope.promotion = response;
						$scope.showPromotion = true;
					},
					function(){
						$scope.message = "Error: " + response.status + " " +response.statusText ;
					}
				);
		
			
			$scope.chef = corporateFactory.getLeaders().get({id:3})
				.$promise.then(
					function(response){
						$scope.chef = response;
						$scope.showChef = true;
					},
					function(response){
						$scope.message = "Error: " + response.status + " " +response.statusText ;
					}
				);
			
			
			
			$scope.dish = menuFactory.getDishes().get({id:index})
				.$promise.then(
					function(response){
						$scope.dish = response;
						$scope.showDish = true;
					},
					function(response){
						$scope.message = "Error: " + response.status + " " +response.statusText ;
					}
			);
			/// using $http
			/*menuFactory.getDish(index)
				.then(
						function(response){
							$scope.dish = response.data;
							$scope.showDish = true;
						},
						function(response){
							$scope.message = "Error: " + response.status + " " +response.statusText ;
						}
				);*/
			
		}])
		
		.controller('AboutController',['$scope','corporateFactory','$resource', 'baseUrl', function($scope, corporateFactory, $resource, baseUrl){
			$scope.showLeaders = false;
			$scope.message = "Loading ...";
			
			$scope.leaders = corporateFactory.getLeaders().query(
				function(response){
					$scope.dish = response;
					$scope.showLeaders = true;
				},
				function(response){
					$scope.message = "Error: " + response.status + " " +response.statusText ;					}
			);
		}])
		
		;