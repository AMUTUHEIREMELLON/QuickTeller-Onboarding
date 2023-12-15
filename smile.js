let crypto = require('crypto');
let timestamp = new Date().toISOString();
let api_key = "d0e89fc5-c7eb-4807-92f0-34c43302dd7c";
let partner_id = "2384";
let hmac = crypto.createHmac('sha256', api_key);

hmac.update(timestamp, 'utf8');
hmac.update(partner_id, 'utf8');
hmac.update("sid_request", 'utf8');


//generating a new smile signature
let signature = hmac.digest().toString('base64');

console.log(signature, timestamp)
