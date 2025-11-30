$(function () {
    let cardsData = [];

    function drawCards(container, data) {
        data.forEach((card) => {

            container.append(`
                <div class="card">
                    <img src="${card.posterImage}" alt="${card.nombre}">
                    <a class="btn-3" href="/Reservation/index.html?movieId=${card.id}">
                        <span>RESERVE</span>
                    </a>
                </div>
            `);
        });
    }


    var token = localStorage.getItem("jwtToken");
    if (token) {
        console.log("Token:", token);
        $.ajax({
            url: 'http://localhost:8080/user/movie',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(data) {
                cardsData = data;
                drawCards($("main"), cardsData);
            },
            error: function(err) {
                console.error("Error:", err);
            }
        });
    } else {
        console.log("Token not found.");
    }
});
