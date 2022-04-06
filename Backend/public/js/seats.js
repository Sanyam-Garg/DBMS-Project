const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
    // const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  
    // localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  
    //copy selected seats into arr
    // map through array
    //return new array of indexes
  
    const selectedSeatsCount = selectedSeats.length;
  
    count.innerText = selectedSeatsCount;
    // total.innerText = selectedSeatsCount * ticketPrice;
  }
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');
  
      updateSelectedCount();
    }
  });