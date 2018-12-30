// Load Data
var friends = require("../data/friends");


// Routing
module.exports = function(app) {

    // API GET Request
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    })

    // API POST Request
    app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;

		var userResponses = userInput.scores;

		// Compute best friend match
		var match = {
            name: "",
            img: "",
        }
		var totalDifference = 10000; 

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			// If lowest difference, record the friend match
			if (diff < totalDifference) {

				totalDifference = diff;
				match.name = friends[i].name;
				match.img = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json(match);
	});
}