// const router = require('express').Router();
// const axios = require('axios');

// router.post('/search', async (req, res) => {
//    const options = {
//   method: 'GET',
//   url: 'test.api.amadeus.com',
//   params: {query: 'london'},
//   headers: {
//     'X-RapidAPI-Key': 'f7FtPkofIucCEZGd1j1nQ2d2HlKHS3rG',
//     'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
//   }
// };
// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
// }
// )

//   module.exports = router;


// api.js




// const express = require('express');
// const router = express.Router();


// router.post('/search', async (req, res) => {
// const chartData = {
//   state: "NC",
//   state_full: "NORTH CAROLINA",
//   city: "ASHEVILLE",
//   airport_name: "ASHEVILLE RGNL",
//   military: "N",
//   faa_ident: "AVL",
//   icao_ident: "KAVL",
//   chart_seq: "10100",
//   chart_code: "MIN",
//   chart_name: "TAKEOFF MINIMUMS",
//   pdf_name: "SE2TO.PDF",
//   pdf_path: "https://charts.aviationapi.com/AIRAC_190103/SE2TO.PDF"
// };

// router.get('/chart', (req, res) => {
//   res.json(chartData);
// });



// // Start the server
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// module.exports = router; 









const router = require('express').Router();
const axios = require('axios');

router.post('/search', async (req, res) => {
    const chartData = {
        state: "NC",
        state_full: "NORTH CAROLINA",
        city: "ASHEVILLE",
        airport_name: "ASHEVILLE RGNL",
        military: "N",
        faa_ident: "AVL",
        icao_ident: "KAVL",
        chart_seq: "10100",
        chart_code: "MIN",
        chart_name: "TAKEOFF MINIMUMS",
        pdf_name: "SE2TO.PDF",
        pdf_path: "https://charts.aviationapi.com/AIRAC_190103/SE2TO.PDF"
      };
try {
	const response = await axios.request(data);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
)

  module.exports = router;