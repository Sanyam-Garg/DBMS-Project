const container = document.querySelector('.container');
const seats= document.getElementsByClassName('seat');
const count = document.getElementById('count')
const total = document.getElementById('total')
var selectSeats = []

for (let i = 0; i < seats.length; i++) {
  const seat = seats[i];
  seat.addEventListener('click', (e) => {
    // this.classList.add
    selectSeats.push(e.target.innerText);
    e.target.classList.toggle('selected');
    updateSelectedCount()
    console.log(selectSeats);
  })
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.seat-number.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = 100 * selectedSeatsCount
    // total.innerText = selectedSeatsCount * ticketPrice;
  }

// seat.addEventListener('click', (e) => {
//     // if (e.target.classList.contains('seat') 
//     // && !e.target.classList.contains('occupied')
//     // ) {
//       console.log("H");
//       e.target.classList.toggle('selected');
  
//       // updateSelectedCount();
//     // }
//   });