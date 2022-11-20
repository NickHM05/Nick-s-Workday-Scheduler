// save reference to important DOM elements
//var timeDisplayEl = $('#time-display');

// handle displaying the time through moment.js
/*function displayTime() {
  var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
  timeDisplayEl.text(rightNow);
}
*/
//The loop and array so far..
for (time= 9; time <= 17; time++) {
    var id= time -9;
    var dataPlanner = "";
    var dpHour = 0;
    var ampm= "";

    if (time === 12) {
        dpHour = 12;
        ampm = "pm";
    } else if (time > 12) {
        dpHour = time - 12;
        ampm = "pm";
    } else if (time < 12) {
        dpHour = time;
        ampm ="am";
    }
    dpHour = dpHour.toString();

    dataPlanner = {
        id: id;
        dpHour:dpHour,
        time:time,
        ampm:ampm,
        dataPlanner:dataPlanner,
    };
    WorkDayPlanner.push(dataPlanner);
}
//Trying another time display header
function currentDate() {
    var dDate = moment().format("dddd,MMM Do");
    $('#currentDay').text(dDate);
}
// Where the localStorage will store data
function storePlannerData() {
    WorkDayPlanner.forEach(function(hour) {
        $("#"+hour.id).val(hour.dataPlanner);
    });
}
//The Display from localStorage for data display
function plannerDataDisplayed(){
    WorkDayPlanner.forEach(function (hour) {
        $("#"+ hour.id).val(hour.dataPlanner);
    });
}

//Loading the Data
function dataLoading() {
    var DataLoad = JSON.parse(localStorage.getItem("dayPlanner"));
    if (DataLoad) {
        WorkDayPlanner= dataLoading;
    }
    storePlannerData();
    plannerDataDisplayed();
}

WorkDayPlanner.forEach(function (hour) {
    var therow = $('<form>');
    therow.addClass("row");
    $(".container").append(therow);

    var theField = $("<div>");
    therow.addClass("col-md-2 hour");
    theField.text(hour.dpHour + hour.ampm);

    var theInput = $("<div>");
    theInput.addClass("col-md-9 description p-0");

    var HourData = $("<textarea>");
    HourData.attr("id", hour.id);
})
//helps display time from function above in line 5
//displayTime();
//setInterval(displayTime, 1000);
currentDate();
