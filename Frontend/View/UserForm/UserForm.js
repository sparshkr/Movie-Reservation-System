var updateTime = function () {
  var now = new Date(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    amPm,
    seconds = now.getSeconds(),
    dayOfWeek = now.getDay(),
    day = now.getDate(),
    month = now.getMonth(),
    year = now.getFullYear();

  var DayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var pHours = document.getElementById("hour"),
    pMinutes = document.getElementById("minutes"),
    pAmPm = document.getElementById("ampm"),
    pSeconds = document.getElementById("seconds"),
    pDayOfWeek = document.getElementById("dayOfWeek"),
    pDay = document.getElementById("day"),
    pMonth = document.getElementById("month"),
    pYear = document.getElementById("year");

  if (hours > 12) {
    amPm = "PM";
  } else {
    amPm = "AM";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  (pHours.textContent = hours),
    (pMinutes.textContent = minutes),
    (pSeconds.textContent = seconds),
    (pAmPm.textContent = amPm),
    (pDayOfWeek.textContent = DayNames[dayOfWeek]),
    (pDay.textContent = day),
    (pMonth.textContent = MonthNames[month]),
    (pYear.textContent = year);
};

updateTime();
setInterval(updateTime, 1000);

$(document).ready(function () {
  $(".contenedor-formularios")
    .find("input, textarea")
    .on("keyup blur focus", function (e) {
      var $this = $(this),
        label = $this.prev("label");

      if (e.type === "keyup") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.addClass("active highlight");
        }
      } else if (e.type === "blur") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.removeClass("highlight");
        }
      } else if (e.type === "focus") {
        if ($this.val() === "") {
          label.removeClass("highlight");
        } else if ($this.val() !== "") {
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
  // Hide all sections
  document.getElementById("crearUsuario").style.display = "none";
  document.getElementById("mostrarUsuarios").style.display = "none";
  // Show the selected section
  if (sectionId == "mostrarUsuarios") {
    document.getElementById(sectionId).style.display = "block";
    LoadTable();
  } else {
    document.getElementById(sectionId).style.display = "block";
  }
}

// Get the JWT token from local storage
function getJwtToken() {
    return localStorage.getItem("jwtToken");
  }
  
  function DeleteUser() {
    var id = document.getElementById("id").value;
    $.ajax({
      type: "DELETE",
      url: "http://localhost:8080/admin/users/" + id,
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      success: function (response) {
        alert("User deleted successfully");
      },
      error: function (error) {
        alert("Error deleting user");
        console.error("Error:", error);
      },
    });
    LoadTable();
  }
  
  function SearchUser() {
    var id = document.getElementById("id").value;
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/admin/users/" + id,
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      success: function (item) {
        $("#UsersMostrarDatos > tbody").empty();
        var row =
          "<tr>" +
          "<td>" +
          item.id +
          "</td>" +
          "<td>" +
          item.username +
          "</td>" +
          "<td>" +
          item.password +
          "</td>" +
          "<td>" +
          item.firstname +
          "</td>" +
          "<td>" +
          item.lastname +
          "</td>" +
          "<td>" +
          item.country +
          "</td>" +
          "<td>" +
          item.role +
          "</td>" +
          "</tr>";
        $("#UsersMostrarDatos > tbody").append(row);
      },
      error: function (error) {
        alert("Error searching for user");
        console.error("Error:", error);
      },
    });
  }
  
  $("#User").on("submit", function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var firstname = $("#name").val();
    var lastname = $("#last").val();
    var country = $("#pais").val();
    var role = $("#role").val();
  
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/admin/users",
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      data: JSON.stringify({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        country: country,
        role: role
      }),
      success: function (response) {
        alert("User added successfully");
        $("#User")[0].reset();
      },
      error: function (error) {
        alert("Error adding user");
        console.error("Error:", error);
      },
    });
  });
  
  function LoadTable() {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/admin/users",
      dataType: "json",
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      success: function (data) {
        $("#UsersMostrarDatos > tbody").empty();
        $.each(data, function (i, item) {
          var row =
            "<tr>" +
            "<td>" +
            item.id +
            "</td>" +
            "<td>" +
            item.username +
            "</td>" +
            "<td>" +
            item.password +
            "</td>" +
            "<td>" +
            item.firstname +
            "</td>" +
            "<td>" +
            item.lastname +
            "</td>" +
            "<td>" +
            item.country +
            "</td>" +
            "<td>" +
            item.role +
            "</td>" +
            "</tr>";
          $("#UsersMostrarDatos > tbody").append(row);
        });
      },
      error: function (error) {
        console.error("Error loading users:", error);
      },
    });
  }
  