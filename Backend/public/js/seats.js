const container = document.querySelector('.container');
const seats= document.getElementsByClassName('seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
var selectSeats =[]
let ticketprice=100;

for (let i = 0; i < seats.length; i++) {
  const seat = seats[i];
  seat.addEventListener('click', (e) => {
    if(selectSeats.includes(e.target.innerText)){
      for( var i = 0; i < selectSeats.length; i++){ 
    
        if ( selectSeats[i] === e.target.innerText) { 
    
            selectSeats.splice(i, 1); 
        }
      }
    }
    else{
      selectSeats.push(e.target.innerText)
    }
    e.target.classList.toggle('selected');
    updateSelectedCount()
    console.log(selectSeats);
  })
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.seat-number.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = ticketprice * selectedSeatsCount
  }
