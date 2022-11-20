// save reference to important DOM elements
var timeDisplayEl = $('#time-display');

// handle displaying the time through moment.js
function displayTime() {
  var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
  timeDisplayEl.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);