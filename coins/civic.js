/**
 * @title Civic
 * @symbol CVC
 * @ethContractAddr 0x41e5560054824ea6b0732e656e3ad64e20e94e45
 * @implementation Dynamic
*/
var request = require('request');

module.exports = (callback) => {
    request('http://api.ethplorer.io/getTokenInfo/0x41e5560054824ea6b0732e656e3ad64e20e94e45?apiKey=freekey', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);

            var resp = {
                t: Number(body.totalSupply) * Math.pow(10, -8)
            };

            if (typeof body.price !== 'undefined' && typeof body.price.availableSupply !== 'undefined') {
                resp.c = Number(body.price.availableSupply);
            }

            callback(resp);
        } else {
            callback(new Error('Request error ' + response.statusCode));
        }
    });
};
