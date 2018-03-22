$(document).ready(function () {
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

    $("#submitInput").on("click", function (event) {
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

    database.ref().on("child_added", function (snapshot) {
        trainName = snapshot.val().train;
        destination = snapshot.val().destination;
        trainTime = snapshot.val().time;
        frequency = snapshot.val().frequency;

        var tableData = [trainName, destination, frequency]
        var nextArrival, minutesAway, currentTime, diff, elapsed;

        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        // console.log("train time conv: ", trainTimeConverted._i)

        currentTime = moment().toLocaleString();
        // console.log("current: ", currentTime);

        diff = moment().diff(moment(trainTimeConverted), "minutes")
        // console.log("diff: ", diff);

        elapsed = diff % frequency;
        // console.log("elapsed: ", elapsed);

        minutesAway = frequency - elapsed;
        // console.log("minutes away: ", minutesAway);

        nextArrival = moment(currentTime).add(minutesAway, "minutes").format("h:mm A");
        // nextArrival.toLocaleString();
        // console.log("next arrival: ", nextArrival);
        
        tableData.push(nextArrival);
        tableData.push(minutesAway);

        var row = $("<tr>")

        for (var i = 0; i < tableData.length; i++) {
            console.log(tableData[i]);
            console.log(typeof tableData[i]);

            var cell = $("<td>");
            $(cell).attr("class", "cell");
            
            $(cell).text(tableData[i]);
            $(row).append(cell);
        }

        $("tbody").prepend(row)

    }, function (error) {
        console.log("Caught errors: ", error.code)
    })
})