$(document).ready(function() {
    console.log("ready");

    // Add firebase, set initial values
    var config = {
        apiKey: "AIzaSyCBJ7AdBnEOb4-2r3PLcontDGpP3RcPF4g",
        authDomain: "train-scheduler-9b8ef.firebaseapp.com",
        databaseURL: "https://train-scheduler-9b8ef.firebaseio.com",
        projectId: "train-scheduler-9b8ef",
        storageBucket: "",
        messagingSenderId: "213809961180"
      };
      firebase.initializeApp(config); 

      var database = firebase.database();

      var trainName = "";
      var destination = "";
      var trainTime = "";
      var frequency = "";

    $("#submitInput").on("click", function(event){
        event.preventDefault();

        // store input values from form
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        trainTime = $("#trainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
        
        // push the data to the database
        database.ref().push({
            train: trainName,
            destination: destination,
            time: trainTime,
            frequency: frequency,
        })
    })
})