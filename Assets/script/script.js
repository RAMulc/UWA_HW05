
var startTime = moment("09:00am", "hh:mma");
var endTime = moment("10:00pm", "hh:mma");

var currentTime = moment();

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
    txtArea.addClass(txtAreaStyle)
    txtArea.attr("type", "text");
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

function updatePage() {
    setInterval(function () {
        setCurrentDate();
        if (moment().minute() === 0 && moment().second() === 0) {
            location.reload();
        }
    }, 1000);
}

function timeSlotHours() {
    for (var i = startTime; i.isBefore(endTime); i.add(1, "hours")) {
        if (moment().format("DD/MM/YYYY") !== getFromLocalStorage("today")) {
            localStorage.setItem("todo-" + i.format("hA"), "");
        }
        createSingleTimeSlot(i.format("hA"), txtAreaCol(i));
    }
    localStorage.setItem("today", moment().format("DD/MM/YYYY"));
}

function getFromLocalStorage(keyName) {
    var storedText = localStorage.getItem(keyName);
    console.log(keyName, storedText);
    if (storedText !== null) {
        return storedText;
    }
    return "";
}

function saveTodo() {
    var hourID = $(this).attr("id");
    var todoText = $(".todo-text-" + hourID).val();
    console.log("todo-text", todoText);
    localStorage.setItem("todo-" + hourID, todoText);
}

function setCurrentDate() {
    $("#currentDay").text(moment().format("DD MMMM YYYY HH:mm:ss"));
}

$(document).on("click", ".saveBtn", saveTodo);

timeSlotHours();
setCurrentDate();
updatePage();
