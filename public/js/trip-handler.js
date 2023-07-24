const tripHandler = async (e) => {
  e.preventDefault();
  //Add event listener Funtion to retrieve values from traveller
  const payload = {
    leavingFrom: document.getElementById('leavingFrom').value,
    destination: document.getElementById('destination').value,
    departure: document.getElementById('departure').value
  };
  const response = await fetch('/api/trip/search', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload)
  }).then(res => res.json()).catch(err => console.error(err));

  //Convert the json array of objects into a map
  const json = response.result.data.flightOffers;
  const map = new Map(Object.entries(json));

  const priceEl = document.querySelector('#trip-result-price');
  const departureEl = document.querySelector('#trip-result-departure');
  const arrivalEl = document.querySelector('#trip-result-arrival');
  // Total price per adult converted in USD (1 USD = 1.11 EUR)
  priceEl.textContent = Math.round((map.get('0').price.total) * 1.11);
  departureEl.textContent = (map.get('0').itineraries[0].segments[0].departure.at);
  arrivalEl.textContent = (map.get('0').itineraries[0].segments[0].arrival.at);
};
document.querySelector('#submit-btn').addEventListener('click', tripHandler);