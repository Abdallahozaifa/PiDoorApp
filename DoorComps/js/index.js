var msg = $(".alert");

var changeStatus = function(color) {
    if (color == "green") {
        msg.text("Door is Unlocked");
        msg.css("background-color", "#a5dc86");
    }
    else {
        msg.text("Door is Locked");
        msg.css("background-color", "#e64942");
    }
};

var doorOpen = function() {
    $.post("/door", function(data) {
        var ivl = setInterval(function() {
            if (data == "Successful") {
                changeStatus("green");
                clearInterval(ivl);
            }
        }, 100);
    });
};

function openDoor(field) {
    var y = $(field).find(".thumb");
    var x = y.attr("class");
    if (y.hasClass("thumbOpened")) {
        changeStatus("red");
        y.removeClass("thumbOpened");
        console.log("closed door!");
    }
    else {
        $(".thumb").removeClass("thumbOpened");
        y.addClass("thumbOpened");
        doorOpen();
        console.log("Opened Door!");
        var ivl = setInterval(function() {
            changeStatus("red");
            y.removeClass("thumbOpened");
            clearInterval(ivl);
        }, 3000);

    }
}
