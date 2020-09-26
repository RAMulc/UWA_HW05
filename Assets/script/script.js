// Set timelimits for working day. Currently hardcoded. 
// Future versions could request the user to enter start and end times.
var startTime = moment("09:00am", "hh:mma");
var endTime = moment("10:00pm", "hh:mma");

// Date and time for this moment in time.
var currentTime = moment();

// Function to create timeslots for the working day.
function createSingleTimeSlot(timeSlotHour, txtAreaStyle) {
    var divRow = $("<div>");
    divRow.addClass("row");
    $(".container").append(divRow);

    var divCol1 = $("<div>");
    divCol1.addClass("col-1 hour");
    divRow.append(divCol1);

    var pHour = $("<p>");
    pHour.text(timeSlotHour);
    divCol1.append(pHour);

    var txtArea = $("<textarea>");
    txtArea.addClass("col-10 textarea")
    txtArea.addClass("todo-text-" + timeSlotHour.toString())
    // Class to determine row styling for past, present and future.
    txtArea.addClass(txtAreaStyle)
    txtArea.attr("type", "text");
    // Reinstate text content from localstorage after a refresh, browser close.
    txtArea.text(getFromLocalStorage("todo-" + timeSlotHour.toString()));
    divRow.append(txtArea);

    var divCol2 = $("<div>");
    divCol2.addClass("col-1 saveBtn");
    divCol2.attr("style", "font-size:24px");
    divCol2.attr("id", timeSlotHour.toString());
    divRow.append(divCol2);

    var pSave = $("<p>");
    pSave.addClass("fa fa-save");
    divCol2.append(pSave);
}

// Function to determine weher a timeslot is in the past, present or future.
function txtAreaCol(timeSlot) {
    if (timeSlot.hour() < currentTime.hour()) {
        return "past";
    }
    else if (timeSlot.hour() > currentTime.hour()) {
        return "future";
    }
    else {
        return "present";
    }
}

// Function to refresh the timeslots on the hour and maintain the date and time on the page.
function updatePage() {
    setInterval(function () {
        setCurrentDate();
        if (moment().minute() === 0 && moment().second() === 0) {
            var lastHour = parseInt(moment().format("h")) - 1;
            lastHour += moment().format("A");
            var thisHour = moment().format("hA");

            $(".todo-text-" + lastHour).removeClass("present");
            $(".todo-text-" + lastHour).addClass("past");
            $(".todo-text-" + thisHour).removeClass("future");
            $(".todo-text-" + thisHour).addClass("present");
        }
    }, 1000);
}

// Function to iterate through timeslot hours when setting up the page.
function timeSlotHours() {
    for (var i = startTime; i.isBefore(endTime); i.add(1, "hours")) {
        if (moment().format("DD/MM/YYYY") !== getFromLocalStorage("today")) {
            localStorage.setItem("todo-" + i.format("hA"), "");
        }
        createSingleTimeSlot(i.format("hA"), txtAreaCol(i));
    }
    // Store todays date in localStorage.
    localStorage.setItem("today", moment().format("DD/MM/YYYY"));
}

// Fuction to retrieve value for a particular keyName.
function getFromLocalStorage(keyName) {
    var storedText = localStorage.getItem(keyName);
    if (storedText !== null) {
        return storedText;
    }
    return "";
}

// Function for saving timeslot tasks.
function saveTodo() {
    var hourID = $(this).attr("id");
    var todoText = $(".todo-text-" + hourID).val();
    localStorage.setItem("todo-" + hourID, todoText);
}

// Current date and time formatted as string.
function setCurrentDate() {
    $("#currentDay").text(moment().format("DD MMMM YYYY HH:mm:ss"));
}

// Click event watching save icons in the timeslots to save text content.
$(document).on("click", ".saveBtn", saveTodo);

// Initialise page with all timeslots and formatting.
timeSlotHours();
// Add date and time to page.
setCurrentDate();
// Sets timer for time display and refreshing page on the hour
updatePage();
