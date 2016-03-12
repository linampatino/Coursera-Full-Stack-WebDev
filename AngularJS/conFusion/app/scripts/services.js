'use strict';

angular.module('confusionApp')

	.constant("baseUrl","http://localhost:3000/")

	.service('menuFactory', ['$resource', 'baseUrl', function($resource, baseUrl){
		
		this.getDishes = function (){
			//return $http.get(baseUrl+"dishes");
			return $resource(baseUrl+"dishes/:id", null, 
					{'update':{method:'PUT'}});
		};
		
		this.getPromotion = function(){
			return $resource(baseUrl+"promotions/:id",null,
					{'get':{method: 'GET'}});
		};
		
		/*this.getDish = function(index){
			return $http.get(baseUrl+"dishees/"+index);
		};*/
		
	}])
	
	
    .factory('corporateFactory', ['$resource','baseUrl', function($resource, baseUrl) {
    
            var corpfac = {};
    
			corpfac.getLeaders = function(){
				return $resource(baseUrl+"leadership/:id", null,
					{'get':{method:'GET'}});
			};
			
			return corpfac; 
    
        }])
		
	.factory('feedbackFactory',['$resource','baseUrl', function($resource, baseUrl){
		
		var feedFac = {};
		
		feedFac.saveFeedback = function(){
			return $resource(baseUrl+"feedback", null,
				{'save':{method:'POST'}});
		}
		
		return feedFac;
	}]);