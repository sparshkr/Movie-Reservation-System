var updateTime = function(){
    
    var now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        amPm,
        seconds = now.getSeconds(),
        dayOfWeek = now.getDay(),
        day = now.getDate(),
        month = now.getMonth(),
        year = now.getFullYear();

        var DayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var MonthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

            var pHours = document.getElementById("hour"),
            pMinutes = document.getElementById("minutes"),
            pAmPm = document.getElementById("ampm"),
            pSeconds = document.getElementById("seconds"),
            pDayOfWeek = document.getElementById("dayOfWeek"),
            pDay = document.getElementById("day"),
            pMonth = document.getElementById("month"),
            pYear = document.getElementById("year");

    if(hours > 12){
        amPm = "PM";
    }else{
        amPm = "AM";
    }
    
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
            seconds = "0" + seconds;
    }


        pHours.textContent = hours,
        pMinutes.textContent = minutes,
        pSeconds.textContent = seconds,
        pAmPm.textContent = amPm,
        pDayOfWeek.textContent = DayNames[dayOfWeek],
        pDay.textContent = day,
        pMonth.textContent = MonthNames[month],
        pYear.textContent = year;
    
    
}

updateTime();
setInterval(updateTime,1000);

$(document).ready(function(){
    
    $(".contenedor-formularios").find("input, textarea").on("keyup blur focus", function (e) {

        var $this = $(this),
          label = $this.prev("label");

        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        } else if (e.type === "blur") {
            if($this.val() === "") {
                label.removeClass("active highlight"); 
                } else {
                label.removeClass("highlight");   
                }   
        } else if (e.type === "focus") {
            if($this.val() === "") {
                label.removeClass("highlight"); 
            } 
            else if($this.val() !== "") {
                label.addClass("highlight");
            }
        }

    });

    $(".tab a").on("click", function (e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".contenido-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });
    
});

function showSection(sectionId) {

    document.getElementById('createHall').style.display = 'none';
    document.getElementById('showHalls').style.display = 'none';
    // Shows the selected section
    if(sectionId=="showHalls"){
        document.getElementById(sectionId).style.display = 'block';
        LoadTable();
    }else{
        document.getElementById(sectionId).style.display = 'block';
    }
}


var jwtToken = localStorage.getItem("jwtToken");

function DeleteHall() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/halls/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(response) {
            alert("Hall deleted successfully");
            LoadTable();
        },
        error: function(error) {
            alert("Error deleting hall");
            console.error("Error:", error);
        }
    });
    LoadTable();
}

function SearchHall() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/hall/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(item) {
            $("#HallShowData > tbody").empty();
            var row =
                "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.name + "</td>" +
                "<td>" + item.capacity + "</td>" +
                "</tr>";
            $("#HallShowData > tbody").append(row);
        },
        error: function(error) {
            alert("Error searching for hall");
            console.error("Error:", error);
        }
    });
}

$("#HallCinema").on("submit", function(event) {
    event.preventDefault();
    var nombre = $("#nombre").val();
    var capacidad = $("#capacidad").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/halls",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        contentType: "application/json",
        data: JSON.stringify({
            name: nombre,
            capacity: capacidad
        }),
        success: function(response) {
            alert("Hall added successfully");
            $("#HallCinema")[0].reset();
        },
        error: function(error) {
            alert("Error adding hall");
            console.error("Error:", error);
        }
    });
});

function LoadTable() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/halls",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        dataType: "json",
        success: function(data) {
            $("#HallShowData > tbody").empty();
            $.each(data, function(i, item) {
                var row =
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.name + "</td>" +
                    "<td>" + item.capacity + "</td>" +
                    "</tr>";
                $("#HallShowData > tbody").append(row);
            });
        },
        error: function(error) {
            console.error("Error loading halls:", error);
        }
    });
}
