'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('locationfacilitydata.json');
let locations = JSON.parse(rawdata);

let stationsData = {'stops':[]};

locations.forEach(location => {
    if(location.LOCATION_NAME.includes('Station')) {
        stationsData.stops.push({'name': location.LOCATION_NAME.replace(' Station', ''), 'efa_id':location.EFA_ID})
    }
})

fs.writeFile('stationsData.json', JSON.stringify(stationsData), 'utf8', (err) => {
    if (err) throw err;
    console.log('complete');
});



