$( document ).ready(function() {
// initialize firebase


var config = {
    apiKey: "AIzaSyB3mI_3-naPTnqU_SGLu0Isacuno0m282A",
    authDomain: "train-sheduler-dc15f.firebaseapp.com",
    databaseURL: "https://train-sheduler-dc15f.firebaseio.com",
    projectId: "train-sheduler-dc15f",
    storageBucket: "",
    messagingSenderId: "350039634271"
  };
  firebase.initializeApp(config);

// a var to represent the database
 var database = firebase.database();

// button to submit the user given info
$("#trainInfoBtn").on("click", function(event) {
	event.preventDefault(); 

	//set user input values to variables
	var trainName = $("#name").val().trim();
	var destination = $("#dest").val().trim();

	//converts user input to usable info
     var firstTime = moment(firstTime, "HH:mm").subtract(1, "years");
     
console.log(firstTime);
	var frequency = $("#freq").val().trim();
	
	//current time
	var currentTime = moment();
	console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));

	 console.log(trainName);
	 console.log(destination);
	 console.log(firstTime);
	 console.log(frequency);
	 console.log(currentTime);



	//gathers together all our new train info
	var newTrain = {

		train: trainName,
		trainGoing: destination,
		trainComing: firstTime,
		everyXMin: frequency
	};


	//uploads newTrain to firebase
	database.ref().push(newTrain);
	//*push* adds to info already in firebase. *set* overwrites preexisting info
	
	//clears elements before adding new text
	$("#name").val("");
	$("#dest").val("");
	$("#firstTime").val("");
	$("#freq").val("");

	
	 return false();

}); //end of onclick

//figure out what this does
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		console.log(childSnapshot.val());
		
		var trainName = childSnapshot.val().train;
		var destination =childSnapshot.val().trainGoing;
		var firstTime = childSnapshot.val().trainComing;
		var frequency = childSnapshot.val().everyXMin;

 		console.log(trainName);
		console.log(destination);
 		console.log(firstTime);
 		console.log(frequency);

		//makes first train time neater
		var trainTime = moment.unix(firstTime).format("hh:mm");
		//calculate difference between times
		var difference =  moment().diff(moment(trainTime),"minutes");

		//time apart(remainder)
		var trainRemain = difference % frequency;

		//minutes until arrival
		var minUntil = frequency - trainRemain;

		//next arrival time
		var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

		//adding info to DOM table 
		$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

});
});

