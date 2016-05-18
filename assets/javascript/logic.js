// 1. Link to Firebase
var transportData = new Firebase("https://scorching-inferno-8993.firebaseio.com/");

// 2. Button for adding transport
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#destinationInput").val().trim();
	var trainTime = $("#arrivalInput").val().trim();
	var trainFreq = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding transport data
	var newTrain = {
		name:  trainName,
		destination: trainDest,
		time: trainTime,
		frequency: trainFreq
	}

	// Uploads transport data to the database
	transportData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(newTrain.time);
	console.log(newTrain.frequency)

	// Alert
	alert("Transport successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#arrivalInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding transport to the database and a row in the html when a user adds an entry
transportData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFreq = childSnapshot.val().frequency;

	// Transport Info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime);
	console.log(trainFreq);

	//Intial Time
	var firstTimeConverted = moment(trainTime ,"HH:mm").subtract(1, "years");
		console.log(firstTimeConverted);
	
	//Current time
	var currentTime = moment();
		console.log("Current Time is: " + moment(currentTime).format("HH:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("Difference in Time is: " + diffTime);

	//Time Apart (remainder)
	var tRemainder = diffTime % trainFreq; 
		console.log("Time remaining: " + tRemainder);

	//Minutes until Train
	var minAway = trainFreq - tRemainder;
		console.log("Minutes until the Train: " + minAway);

	//nextTrain
	var nextTrain = moment().add(minAway, "minutes");
		console.log("Planned Arrival Time: " + moment(nextTrain).format("HH:mm"));

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trainTime + "</td><td>" + minAway + "</td><td>");

});

