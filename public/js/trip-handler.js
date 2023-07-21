const tripHandler = async (e) => {
    e.preventDefault();
    //Add event listener Funtion to retrieve values from traveller
    const payload = {
        leavingFrom: document.getElementById('leavingFrom').value,
        destination: document.getElementById('destination').value,
        departure: document.getElementById('departure').value
    }

    const response = await fetch('/api/trip/search', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(res => res.json())

    const priceEl = document.querySelector('#trip-result-price');
    const departuretimeEl = document.querySelector('#trip-result-departure-time');
    const arrivaltimeEl = document.querySelector('#trip-result-arrival-time');
    // temporary placeholder properties
    priceEl.textContent = response.price
    departuretimeEl.textContent = response.departuretime
    arrivaltimeEl.textContent = response.arrivaltime
}
document.querySelector('#submit-btn').addEventListener('click', tripHandler);