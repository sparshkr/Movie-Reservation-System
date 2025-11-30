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


function getJwtToken() {
    return localStorage.getItem("jwtToken");
}

function showSection(sectionId) {
    // Hide all sections
    document.getElementById('createShowtime').style.display = 'none';
    document.getElementById('showShowtimes').style.display = 'none';
    // Show the selected section
    if(sectionId == "showShowtimes"){
        document.getElementById(sectionId).style.display = 'block';
        LoadTable();
    }else{
        document.getElementById(sectionId).style.display = 'block';
    }
}
// Function to delete a showtime
function DeleteShowtime() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/showtimes/" + id,
        headers: {
            "Authorization": "Bearer " + getJwtToken()
        },
        success: function(response) {
            alert("Showtime deleted successfully");
            LoadTable();
        },
        error: function(error) {
            alert("Error deleting showtime");
            console.error("Error:", error);
        }
    });
}

// Function to get a showtime by ID
function SearchShowtime() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/showtimes/" + id,
        headers: {
            "Authorization": "Bearer " + getJwtToken()
        },
        success: function(item) {
            $("#ShowtimesMostrarDatos > tbody").empty();
            var row =
                "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.movie.id + "</td>" +
                "<td>" + item.hall.id + "</td>" +
                "<td>" + item.year + "</td>" +
                "<td>" + item.month + "</td>" +
                "<td>" + item.day + "</td>" +
                "<td>" + item.hour + "</td>" +
                "<td>" + item.minutes + "</td>" +
                "</tr>";
            $("#ShowtimesMostrarDatos > tbody").append(row);
        },
        error: function(error) {
            alert("Error finding showtime");
            console.error("Error:", error);
        }
    });
}

// Function to add a new showtime
$("#ShowtimeCinema").on("submit", function(event) {
    event.preventDefault();

    // Get values from form fields
    var movieId = $("#movieId").val();
    var hallId = $("#hallId").val();
    var year = $("#anio").val();
    var month = $("#mes").val();
    var day = $("#dia").val();
    var hour = $("#hora").val();
    var minutes = $("#minutos").val();

    function getDetails() {
        return $.when(
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/admin/movie/" + movieId,
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() 
                }

            }),
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/admin/hall/" + hallId,
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() // Incluye el token JWT en el encabezado
                }
            })
        ).done(function(movieResponse, hallResponse) {
            var movie = movieResponse[0]; 
            var hall = hallResponse[0];  

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/admin/showtimes",
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken()
                },
                data: JSON.stringify({
                    movie: movie,
                    hall: hall,
                    year: year,
                    month: month,
                    day: day,
                    hour: hour,
                    minutes: minutes
                }),
                success: function(response) {
                    alert("Showtime added successfully");
                    $("#ShowtimeCinema")[0].reset();
                },
                error: function(error) {
                    alert("Error adding showtime");
                    console.error("Error:", error);
                }
            });
        }).fail(function(xhr, status, error) {
            alert("Error getting details");
            console.error("Error getting details:", status, error);
        });
    }
    getDetails();
});

// Function to display the showtimes table
function LoadTable() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/showtimes",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + getJwtToken()
        },
        success: function(data) {
            $("#ShowtimesMostrarDatos > tbody").empty();
            $.each(data, function(i, item) {
                var row =
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.movie.id + "</td>" +
                    "<td>" + item.hall.id + "</td>" +
                    "<td>" + item.year + "</td>" +
                    "<td>" + item.month + "</td>" +
                    "<td>" + item.day + "</td>" +
                    "<td>" + item.hour + "</td>" +
                    "<td>" + item.minutes + "</td>" +
                    "</tr>";
                $("#ShowtimesMostrarDatos > tbody").append(row);
            });
        },
        error: function(error) {
            console.error("Error loading showtimes:", error);
        }
    });
}

function generateReservations() {
    var token = localStorage.getItem("jwtToken"); 
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/reservations/generate",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(response) {
            alert("Reservations generated successfully");
        },
        error: function(error) {
            alert("Error generating reservations");
            console.error("Error:", error);
        }
    });
}







