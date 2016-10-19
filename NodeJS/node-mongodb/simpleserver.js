var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
	
// Connection URL	
var url = 'mongodb://localhost:27017/conFusion';

//Use connect method to connect to the server
MongoClient.connect(url, function(err, db){
	assert.equal(err,null);
	console.log("Connected correctly to server");
	
	var collection = db.collection("dishes");
	
	collection.insertOne({name:"Uthapizza", description:"test"}, 
	function(err, result){
		assert.equal(err, null);
		console.log("after insert:");
		console.log(result.ops);
		
		//select  = find({}) the parameter is similar to where into sql statement 
		collection.find({}).toArray(function(err, docs){
			assert.equal(err, null);
			console.log("Found: ");
			console.log(docs);
		});
		
		//delete
		db.dropCollection("dishes", function(err, result){
			assert.equal(err, null);
			db.close();
		});
		
		
	});
	
});