
	var rect = require('./rectangle-2');

	function solveRect(l, b){
		console.log("Solving for rectangle with 1 = " + 1 + " and b = " + b);
		
		rect(l,b, function(err, rectangle){
					if(err){
						console.log(err);
					}else{
						console.log("The area of a rectangle of dimensions length = " + l + 
								" and breadth = " + b + "is " + rectangle.area());
						console.log("The perimeter a rectangle of dimensions length = " + l +
								"and bradth = " + b + " is " + rectangle.perimeter());
						
					}
					
				}
		);
		
		
	};
	
	solveRect(2,4);
	solveRect(3,5);
	solveRect(-3,5);
	