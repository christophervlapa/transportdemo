const https = require('https');
const url = require('url');

exports.handler = async (event) => {
    
    let tripDate = '';
    let tripOrigin = '';
    let tripDestination = '';

     if (event.queryStringParameters && event.queryStringParameters.tripDate) {
        console.log("Trip date: " + event.queryStringParameters.tripDate);
        tripDate = event.queryStringParameters.tripDate;
    }
    
    if (event.queryStringParameters && event.queryStringParameters.tripOrigin) {
        console.log("tripOrigin: " + event.queryStringParameters.tripOrigin);
        tripOrigin = event.queryStringParameters.tripOrigin;
    }
    
    if (event.queryStringParameters && event.queryStringParameters.tripDestination) {
        console.log("tripDestination: " + event.queryStringParameters.tripDestination);
        tripDestination = event.queryStringParameters.tripDestination;
    }
    
    return httprequest(tripDate, tripOrigin, tripDestination).then((data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    return response;
    });
};

function httprequest(tripDate, tripOrigin, tripDestination) {
     return new Promise((resolve, reject) => {

        const transportApiKey = 'apikey XKlhujQMZdr9sbjy19V0Kv3zUOafutf7NRNq';
        
        // request paramaters
        const transportApiOptions = new URLSearchParams({
            'outputFormat': 'rapidJSON',
            'coordOutputFormat': 'EPSG:4326',
            'depArrMacro': 'dep',
            'itdDate': tripDate,
            'type_origin': 'any',
            'name_origin': tripOrigin,
            'type_destination': 'any',
            'name_destination': tripDestination,
            'TfNSWTR': 'true'
        });
        
        const options = {
            hostname: 'api.transport.nsw.gov.au',
            path:  '/v1/tp/trip?' + transportApiOptions,
            headers: {
                Authorization: transportApiKey
            },
            port: 443,
            method: 'GET'
        };

        const req = https.request(options, (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}