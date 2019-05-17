// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

let friends = require("../data/friends");


//ROUTING 
//MATCHING THE USER INPUTS WITH THE DATABASE INPUTS
module.exports = function(app) {
    //GET REQUESTS
    //The code handles when a user visits the page
     app.get("/api/friends", function(req, res) {
        res.json(friends);
      });
      //RESPONDS TO THE USER INPUT
      app.post("/api/friends", function(req, res) {
          let bestMatch = {
              name: " ",
              photo: " ",
              friendDifference: Infinity,
            };
        //parsing the USERS survery post
        let userData = req.body;
        let userScores = userData.scores;
        //calculating the difference between the User and Data
        let totalDifference;
        // Here we loop through all the friend possibilities in the database.
         for (var i = 0; i < friends.length; i++) {
        var currentFriend = friends[i];
        totalDifference = 0;
  
        console.log(currentFriend.name);
         
        // We then loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));


      }
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData);
    res.json(bestMatch);


  
});
};
    
