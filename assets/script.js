// save reference to important DOM elements
var timeDisplayEl = $('#time-display');

// handle displaying the time through moment.js
function displayTime() {
    var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
    timeDisplayEl.text(rightNow);
}

var WorkDayPlanner = [];

//The loop and array so far..
for (time = 9; time <= 17; time++) {
    var id = time - 9;
    var dataPlanner = "";
    var dpHour = 0;
    var ampm = "";

    if (time === 12) {
        dpHour = 12;
        ampm = "pm";
    } else if (time > 12) {
        dpHour = time - 12;
        ampm = "pm";
    } else if (time < 12) {
        dpHour = time;
        ampm = "am";
    }
    dpHour = dpHour.toString();

    dataPlanner = {
        id: id,
        dpHour: dpHour,
        time: time,
        ampm: ampm,
        dataPlanner: dataPlanner,
    };
    WorkDayPlanner.push(dataPlanner);
}

// Where the localStorage will store data
function storePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(WorkDayPlanner));
}
//The Display from localStorage for data display
function plannerDataDisplayed() {
    WorkDayPlanner.forEach(function (hour) {
        $("#" + hour.id).val(hour.dataPlanner);
    });
}

//Loading the Data
function dataLoading() {
    var DataLoad = JSON.parse(localStorage.getItem("dayPlanner"));
    if (DataLoad) {
        WorkDayPlanner = DataLoad;
    }
    storePlannerData();
    plannerDataDisplayed();
}

WorkDayPlanner.forEach(function (hour) {
    var therow = $("<form>");
    therow.addClass("row");
    $(".container").append(therow);

    var theField = $("<div>");
    theField.addClass("col-sm-2 hour");
    theField.text(hour.dpHour + hour.ampm);

    var theInput = $("<div>");
    theInput.addClass("col-sm-9 description p-0");

    var HourData = $("<textarea>");
    HourData.attr("id", hour.id);

    //compare the times - color coding
    if (hour.time == moment().format("HH")) {
        HourData.addClass("present");
    } else if (hour.time < moment().format("HH")) {
        HourData.addClass("past");
    } else if (hour.time > moment().format("HH")) {
        HourData.addClass("future");
    }
    theInput.append(HourData);

    // create the save button for the end of each row
    var saveButton = $("<i class='far fa-save fa-lg'></i>");
    var saveEndButton = $("<button>").addClass("col-sm-1 saveBtn");

    //appending the elements to the row
    saveEndButton.append(saveButton)
    therow.append(theField, theInput, saveEndButton);
});

//save button functions are enabled here
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    //saves the information to the array here
    var SaveBox = $(this).siblings(".description").children().attr("id");
    WorkDayPlanner[SaveBox].dataPlanner = $(this)
        .siblings(".description")
        .children()
        .val();

    storePlannerData();
    plannerDataDisplayed();
});

//helps display time from function above in line 5
displayTime();
setInterval(displayTime, 1000);

//will load the data for the page
dataLoading();