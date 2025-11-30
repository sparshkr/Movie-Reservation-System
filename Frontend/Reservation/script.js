var showtimeId = 4;
let sideColumns = 4; // Number of columns in the side groups
let centerColumns = 16; // Number of columns in the central group
let rows = 6;
const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
const groups = [
  { selector: '.asientos-lado:first-child table', columnas: sideColumns },
  { selector: '.asientos-centro table', columnas: centerColumns },
  { selector: '.asientos-lado:last-child table', columnas: sideColumns }
];

let seatNumber = 1;

groups.forEach((group) => {
  const thead = document.querySelector(`${group.selector} thead`);
  const tbody = document.querySelector(`${group.selector} tbody`);

  // Create header (column numbers)
  let headerRow = thead.insertRow();
  headerRow.insertCell(); // Empty cell for row letters
  for (let i = 0; i < group.columnas; i++) {
    headerRow.insertCell().innerHTML = seatNumber;
    seatNumber++;
  }

  seatNumber -= group.columnas;

  for (let i = 0; i < rows; i++) {
    let bodyRow = tbody.insertRow();
    bodyRow.insertCell().innerHTML = letters[i]; 
    for (let j = 0; j < group.columnas; j++) {
        let cell = bodyRow.insertCell();
        let button = document.createElement('button');
        button.className = 'asiento-btn no-seleccionado';
        button.dataset.asiento = `${letters[i]}${seatNumber}`;
        button.innerHTML = `<i class="material-icons">event_seat</i><br>${letters[i]}${seatNumber}`;
        cell.appendChild(button);

        button.addEventListener('click', () => {
            if (!button.classList.contains('ocupado')) {
                button.classList.toggle('seleccionado');
                button.classList.toggle('no-seleccionado');
            }
        });

        seatNumber++;
    }

    seatNumber -= group.columnas;
}

numeroAsiento += grupo.columnas;
});


getOccupiedSeats(showtimeId);


function markAsOccupied(seatId) {

  const seat = document.querySelector(`button[data-seat="${seatId}"]`);
  
  if (seat) {
    seat.classList.add('occupied');
    seat.classList.remove('selected', 'not-selected');
    seat.disabled = true; 
  } else {
    console.error('Seat not found:', seatId);
  }
}


document.querySelector('#show-seats').addEventListener('click', () => {
  let selectedSeats = [];
  document.querySelectorAll('.selected').forEach(btn => {
    selectedSeats.push(btn.dataset.seat);
  });
  console.log('Selected seats:', selectedSeats);
});
let pricePerSeat = 10;
document.querySelector('#show-seats').addEventListener('click', () => {
    let selectedSeats = [];
    document.querySelectorAll('.selected').forEach(btn => {
        selectedSeats.push(btn.dataset.seat);
      });
    let total = selectedSeats.length * pricePerSeat;
    document.getElementById('selected-seats').textContent = `Selected seats: ${selectedSeats.join(', ')}`;
    document.getElementById('final-price').textContent = `Total price: $${total.toFixed(2)}`;
    document.getElementById('reserve-btn').style.display = 'inline-block';
  });




let selectedSeats = [];

document.querySelector('#reserve-btn').addEventListener('click', () => {
    selectedSeats = [];
    document.querySelectorAll('.selected').forEach(btn => {
        selectedSeats.push(btn.dataset.seat);
        btn.classList.add('occupied');
        btn.classList.remove('selected');
        btn.disabled = true;
    });

    alert(`Reservation made for seats: ${selectedSeats.join(', ')}`);
    document.getElementById('selected-seats').textContent = '';
    document.getElementById('final-price').textContent = '';
    document.getElementById('reserve-btn').style.display = 'none';

    sendSelectedSeats(showtimeId);
});




function displayReservations(reservations) {
  const reservationsList = document.getElementById('reservations-list');
  reservationsList.innerHTML = '';
  reservations.forEach(reservation => {
      reservationsList.innerHTML += `<p>Reservation ID: ${reservation.id}, Showtime ID: ${reservation.showtimeId}</p>`;
  });
}




async function sendSelectedSeats(showtimeId) {
  const jwtToken = localStorage.getItem("jwtToken");

  if (selectedSeats.length === 0) {
      alert('You have not selected any seats.');
      return;
  }

  try {
      const response = await fetch(`http://localhost:8080/user/reservation/${showtimeId}/add-seats`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(selectedSeats)
      });

      if (!response.ok) {
          throw new Error('Error sending seats.');
      }

      const result = await response.json();

      if (result.message) {
          alert(result.message);

          selectedSeats.forEach(seat => {
              markAsOccupied(seat);
          });


          await getOccupiedSeats(showtimeId);
      } else {
          alert('There was a problem with the reservation.');
      }

  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while making the reservation.');
  }
}




async function getOccupiedSeats(showtimeId) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
      const response = await fetch(`http://localhost:8080/user/reservation/${showtimeId}/occupied-seats`, {
          headers: {
              'Authorization': `Bearer ${jwtToken}`
          }
      });

      if (!response.ok) {
          throw new Error('Error getting occupied seats.');
      }

      const occupiedSeats = await response.json();

      // Mark all occupied seats in the UI
      occupiedSeats.forEach(seat => {
          markAsOccupied(seat);
      });

  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while getting the occupied seats.');
  }
}



